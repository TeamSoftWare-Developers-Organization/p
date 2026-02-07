// src/health-log/commands/handlers/update-health-log.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateHealthLogCommand } from '../impl/update-health-log.command';
import { HealthLog } from 'src/Core Models/HealthLog';

@CommandHandler(UpdateHealthLogCommand)
export class UpdateHealthLogHandler
  implements ICommandHandler<UpdateHealthLogCommand> {
  constructor(
    @InjectRepository(HealthLog)
    private readonly healthLogRepository: Repository<HealthLog>,
  ) { }

  async execute(command: UpdateHealthLogCommand): Promise<HealthLog> {
    const { id, updateHealthLogDto } = command;

    const healthLog = await this.healthLogRepository.findOne({ where: { LogID: id } });

    if (!healthLog) {
      throw new NotFoundException(`HealthLog with ID ${id} not found`);
    }

    if (updateHealthLogDto.PoultryID) {
      healthLog.PoultryID = updateHealthLogDto.PoultryID;
      healthLog.Poultry = { PoultryID: updateHealthLogDto.PoultryID } as any;
    }
    if (updateHealthLogDto.LogDate) {
      healthLog.LogDate = new Date(updateHealthLogDto.LogDate);
    }
    if (updateHealthLogDto.Condition) {
      healthLog.Condition = updateHealthLogDto.Condition;
    }
    if (updateHealthLogDto.Notes !== undefined) {
      healthLog.Notes = updateHealthLogDto.Notes;
    }
    if (updateHealthLogDto.Treatment !== undefined) {
      healthLog.Treatment = updateHealthLogDto.Treatment;
    }

    return this.healthLogRepository.save(healthLog);
  }

}
