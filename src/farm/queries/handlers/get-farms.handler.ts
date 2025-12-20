// src/farm/queries/handlers/get-farms.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFarmsQuery } from '../impl/et-farms.query';
import { Farm } from 'src/Core Models/Farm';

@QueryHandler(GetFarmsQuery)
export class GetFarmsHandler implements IQueryHandler<GetFarmsQuery> {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) { }

  async execute(): Promise<Farm[]> {
    return this.farmRepository.find({ relations: ['Coops'] });
  }
}
