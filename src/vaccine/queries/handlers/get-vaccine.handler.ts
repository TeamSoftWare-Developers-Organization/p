// src/vaccine/queries/handlers/get-vaccine.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetVaccineQuery } from '../impl/get-vaccine.query';
import { Vaccine } from 'src/Core Models/Vaccine';

@QueryHandler(GetVaccineQuery)
export class GetVaccineHandler implements IQueryHandler<GetVaccineQuery> {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) { }

  async execute(query: GetVaccineQuery): Promise<Vaccine> {
    const { vaccineId } = query;
    const vaccine = await this.vaccineRepository.findOne({
      where: { VaccineID: vaccineId },
    });
    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${vaccineId} not found`);
    }
    return vaccine;
  }
}
