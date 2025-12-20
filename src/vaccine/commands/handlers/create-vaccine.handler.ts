import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateVaccineCommand } from '../impl/create-vaccine.command';
import { Vaccine } from 'src/Core Models/Vaccine';

@CommandHandler(CreateVaccineCommand)
export class CreateVaccineHandler
  implements ICommandHandler<CreateVaccineCommand> {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) { }

  async execute(command: CreateVaccineCommand): Promise<Vaccine> {
    const { createVaccineDto } = command;

    // Check if the expiration date has passed
    if (createVaccineDto.expirationDate) {
      const expirationDate = new Date(createVaccineDto.expirationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

      if (expirationDate < today) {
        throw new BadRequestException(
          'لا يمكن إنشاء سجل لقاح بتاريخ صلاحية منتهٍ. يرجى التحقق من التاريخ.',
        );
      }
    }

    const vaccine = this.vaccineRepository.create(createVaccineDto);
    return this.vaccineRepository.save(vaccine);
  }
}
