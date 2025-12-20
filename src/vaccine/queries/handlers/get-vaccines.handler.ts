// src/vaccine/queries/handlers/get-vaccines.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetVaccinesQuery } from '../impl/get-vaccines.query';
import { Vaccine } from 'src/Core Models/Vaccine';

@QueryHandler(GetVaccinesQuery)
export class GetVaccinesHandler implements IQueryHandler<GetVaccinesQuery> {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) { }

  async execute(): Promise<Vaccine[]> {
    return this.vaccineRepository.find();
  }
}
