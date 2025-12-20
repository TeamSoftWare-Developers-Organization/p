// src/breed/queries/handlers/get-breeds.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBreedsQuery } from '../impl/get-breeds.query';
import { Breed } from 'src/Core Models/Breed';

@QueryHandler(GetBreedsQuery)
export class GetBreedsHandler implements IQueryHandler<GetBreedsQuery> {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { }

  async execute(): Promise<Breed[]> {
    return this.breedRepository.find({ relations: ['Poultries'] });
  }
}
