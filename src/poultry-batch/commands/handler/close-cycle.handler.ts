import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource, MoreThanOrEqual } from 'typeorm';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CloseCycleCommand } from '../impl/close-cycle.command';
import { PoultryBatch } from '../../../Core Models/PoultryBatch';
import { SlaughterRecord } from '../../../Core Models/SlaughterRecord';
import { CycleSummary } from '../../../Core Models/CycleSummary';
import { Shed } from '../../../Core Models/Shed';
import { FrozenPoultryInventory } from '../../../Core Models/FrozenPoultryInventory';
import { Mortality } from '../../../Core Models/Mortality';

@CommandHandler(CloseCycleCommand)
export class CloseCycleHandler implements ICommandHandler<CloseCycleCommand> {
    constructor(private dataSource: DataSource) { }

    async execute(command: CloseCycleCommand): Promise<void> {
        const { batchId, closeCycleDto } = command;

        try {
            await this.dataSource.transaction(async (manager) => {
                // 1. البحث عن الدفعة
                const batch = await manager.findOne(PoultryBatch, {
                    where: { BatchID: batchId },
                    relations: ['Coop'],
                });

                if (!batch) {
                    throw new NotFoundException(`PoultryBatch with ID ${batchId} not found.`);
                }

                if (batch.Status === 'Completed') {
                    throw new BadRequestException('This cycle is already completed.');
                }

                // 2. حساب نسبة التصافي والإيرادات
                const liveWeight = Number(closeCycleDto.liveWeight);
                const dressedWeight = Number(closeCycleDto.dressedWeight);
                const pricePerKg = Number(closeCycleDto.pricePerKg);

                const dressingPercentage = liveWeight > 0 ? (dressedWeight / liveWeight) * 100 : 0;
                const totalRevenue = dressedWeight * pricePerKg;

                // 3. إنشاء سجل الذبح
                const slaughterRecord = manager.create(SlaughterRecord, {
                    BatchID: batchId,
                    SlaughterhouseID: Number(closeCycleDto.slaughterhouseID),
                    TransferDate: closeCycleDto.transferDate ? new Date(closeCycleDto.transferDate) : new Date(),
                    LiveWeight: liveWeight,
                    DressedWeight: dressedWeight,
                    DressingPercentage: Number(dressingPercentage.toFixed(2)),
                    PricePerKg: pricePerKg,
                    TotalRevenue: totalRevenue,
                    Notes: closeCycleDto.notes,
                });
                await manager.save(slaughterRecord);

                // 4. تحديث حالة الدفعة
                batch.Status = 'Completed';
                await manager.save(batch);

                // 5. تصفير الحظيرة
                if (batch.CoopID) {
                    const shed = await manager.findOne(Shed, { where: { id: batch.CoopID } });
                    if (shed) {
                        shed.currentBirds = 0;
                        await manager.save(shed);
                    }
                }

                // 6. جلب بيانات النفوق لحساب التقرير النهائي (خلال فترة الدورة)
                let totalMortality = 0;
                if (batch.CoopID) {
                    const mortalities = await manager.find(Mortality, {
                        where: {
                            CoopID: batch.CoopID,
                            MortalityDate: MoreThanOrEqual(batch.ArrivalDate || new Date(0))
                        }
                    });
                    totalMortality = mortalities.reduce((sum, m) => sum + Number(m.NumberOfBirds), 0);
                }

                // 7. إنشاء ملخص الدورة
                const cycleSummary = manager.create(CycleSummary, {
                    BatchID: batchId,
                    StartDate: batch.ArrivalDate || new Date(),
                    EndDate: new Date(),
                    InitialBirds: Number(batch.ChickCount),
                    TotalMortality: totalMortality,
                    FinalBirds: Number(batch.ChickCount) - totalMortality,
                    CycleDurationDays: batch.ArrivalDate
                        ? Math.floor((new Date().getTime() - new Date(batch.ArrivalDate).getTime()) / (1000 * 60 * 60 * 24))
                        : 0,
                    TotalExpenses: 0,
                    TotalFeedCost: 0,
                    TotalMedicationCost: 0,
                    TotalLaborCost: 0,
                    OtherExpenses: 0,
                    TotalRevenue: totalRevenue,
                    NetProfit: totalRevenue,
                    ProfitMargin: 0,
                    MortalityRate: batch.ChickCount > 0 ? Number(((totalMortality / batch.ChickCount) * 100).toFixed(2)) : 0,
                    Status: 'completed',
                });
                await manager.save(cycleSummary);

                // 8. إنشاء سجل مخزون جديد لهذه الدفعة (اختياري)
                if (closeCycleDto.sendToInventory) {
                    const poultryTypeId = batch.BreedID || 1;
                    const finalBirdsCount = Number(batch.ChickCount) - totalMortality;

                    const newInventory = manager.create(FrozenPoultryInventory, {
                        PoultryTypeID: poultryTypeId,
                        Quantity: finalBirdsCount,
                        Weight: dressedWeight,
                        FreezeDate: new Date(),
                        SlaughterhouseID: Number(closeCycleDto.slaughterhouseID),
                    });
                    await manager.save(newInventory);
                }
            });
        } catch (error) {
            console.error('Cycle Closure Error:', error);
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException(`فشل في إغلاق الدورة: ${error.message}`);
        }
    }
}
