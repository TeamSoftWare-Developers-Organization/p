import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryTakeDetailCommand } from '../impl/create-inventory-take-detail.command';
import { InventoryTakeDetail } from 'src/Core Models/InventoryTakeDetail';

@CommandHandler(CreateInventoryTakeDetailCommand)
export class CreateInventoryTakeDetailHandler
    implements ICommandHandler<CreateInventoryTakeDetailCommand> {
    constructor(
        @InjectRepository(InventoryTakeDetail)
        private readonly repository: Repository<InventoryTakeDetail>,
    ) { }

    async execute(command: CreateInventoryTakeDetailCommand): Promise<InventoryTakeDetail> {
        const { dto } = command;
        const detail = this.repository.create({
            InventoryTakeID: dto.InventoryTakeID,
            ItemID: dto.ItemID,
            ItemType: dto.ItemType,
            QuantityCounted: dto.QuantityCounted
        });
        return this.repository.save(detail);
    }
}
