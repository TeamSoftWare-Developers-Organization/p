// src/vaccine/commands/handlers/remove-vaccine.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveVaccineCommand } from '../impl/remove-vaccine.command';
import { Vaccine } from 'src/Core Models/Vaccine';

@CommandHandler(RemoveVaccineCommand)
export class RemoveVaccineHandler
  implements ICommandHandler<RemoveVaccineCommand> {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) { }

  async execute(command: RemoveVaccineCommand): Promise<void> {
    const { id } = command;
    const result = await this.vaccineRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vaccine with ID ${id} not found`);
    }
  }
}
