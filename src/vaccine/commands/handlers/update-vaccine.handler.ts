import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateVaccineCommand } from '../impl/update-vaccine.command';
import { Vaccine } from 'src/Core Models/Vaccine';

@CommandHandler(UpdateVaccineCommand)
export class UpdateVaccineHandler
  implements ICommandHandler<UpdateVaccineCommand> {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) { }

  async execute(command: UpdateVaccineCommand): Promise<Vaccine> {
    const { id, updateVaccineDto } = command;

    // Check if the expiration date is being updated and if it has passed
    if (updateVaccineDto.expirationDate) {
      const expirationDate = new Date(updateVaccineDto.expirationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

      if (expirationDate < today) {
        throw new BadRequestException(
          'لا يمكن تحديث سجل لقاح بتاريخ صلاحية منتهٍ. يرجى التحقق من التاريخ.',
        );
      }
    }

    // Check if the vaccine record exists before attempting to update
    const vaccine = await this.vaccineRepository.preload({
      VaccineID: id,
      ...updateVaccineDto,
    });
    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${id} not found`);
    }

    // Save the updated record
    return this.vaccineRepository.save(vaccine);
  }
}
