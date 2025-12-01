import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetShedsQuery } from '../impl/get-shed.query';
import { Shed } from 'src/Core Models/Shed';

@QueryHandler(GetShedsQuery)
export class GetShedsHandler implements IQueryHandler<GetShedsQuery> {
    constructor(
        @InjectRepository(Shed)
        private readonly shedRepository: Repository<Shed>,
    ) { }

    async execute(query: GetShedsQuery): Promise<Shed[]> {
        return this.shedRepository.find();
    }
}
