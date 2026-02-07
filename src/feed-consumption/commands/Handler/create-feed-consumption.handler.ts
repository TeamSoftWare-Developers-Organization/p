import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedConsumptionCommand } from '../create-feed-consumption.command';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';

/**
 * مستلم أمر إنشاء سجل استهلاك علف جديد.
 * مسؤول عن إنشاء وحفظ سجل استهلاك العلف في قاعدة البيانات.
 */
@CommandHandler(CreateFeedConsumptionCommand)
export class CreateFeedConsumptionHandler implements ICommandHandler<CreateFeedConsumptionCommand> {
  constructor(
    @InjectRepository(FeedConsumption)
    private readonly feedConsumptionRepository: Repository<FeedConsumption>,
  ) { }

  /**
   * ينفذ أمر إنشاء سجل استهلاك العلف.
   * @param command أمر CreateFeedConsumptionCommand
   * @returns وعد بسجل FeedConsumption الجديد
   */
  async execute(command: CreateFeedConsumptionCommand): Promise<FeedConsumption> {
    const { createFeedConsumptionDto } = command;

    const consumption = this.feedConsumptionRepository.create({
      ConsumptionDate: new Date(createFeedConsumptionDto.ConsumptionDate),
      Quantity: createFeedConsumptionDto.Quantity,
      Feed: { FeedID: createFeedConsumptionDto.FeedID } as any,
      Shed: createFeedConsumptionDto.ShedID ? ({ id: createFeedConsumptionDto.ShedID } as any) : null,
    });

    return this.feedConsumptionRepository.save(consumption);
  }

}
