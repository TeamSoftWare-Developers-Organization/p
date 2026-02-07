import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFeedConsumptionCommand } from '../update-feed-consumption.command';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';

/**
 * مستلم أمر تحديث سجل استهلاك العلف.
 * مسؤول عن التحقق من وجود السجل ثم تطبيق التحديثات.
 */
@CommandHandler(UpdateFeedConsumptionCommand)
export class UpdateFeedConsumptionHandler implements ICommandHandler<UpdateFeedConsumptionCommand> {
  constructor(
    @InjectRepository(FeedConsumption)
    private readonly feedConsumptionRepository: Repository<FeedConsumption>,
  ) { }

  /**
   * ينفذ عملية التحديث.
   * @param command أمر UpdateFeedConsumptionCommand
   * @returns وعد بسجل FeedConsumption المحدث
   */
  async execute(command: UpdateFeedConsumptionCommand): Promise<FeedConsumption> {
    const { id, updateFeedConsumptionDto } = command;

    const consumption = await this.feedConsumptionRepository.findOne({ where: { FeedConsumptionID: id } });

    if (!consumption) {
      throw new NotFoundException(`FeedConsumption record with ID ${id} not found`);
    }

    if (updateFeedConsumptionDto.ConsumptionDate) {
      consumption.ConsumptionDate = new Date(updateFeedConsumptionDto.ConsumptionDate);
    }
    if (updateFeedConsumptionDto.Quantity !== undefined) {
      consumption.Quantity = updateFeedConsumptionDto.Quantity;
    }
    if (updateFeedConsumptionDto.FeedID) {
      consumption.Feed = { FeedID: updateFeedConsumptionDto.FeedID } as any;
    }
    if (updateFeedConsumptionDto.ShedID) {
      consumption.Shed = { id: updateFeedConsumptionDto.ShedID } as any;
    }

    return this.feedConsumptionRepository.save(consumption);
  }

}
