import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPoultryBatchesQuery } from '../impl/get-poultry-batches.query';
import { PoultryBatch } from 'src/Core Models/PoultryBatch';

@QueryHandler(GetPoultryBatchesQuery)
export class GetPoultryBatchesHandler implements IQueryHandler<GetPoultryBatchesQuery> {
    constructor(
        @InjectRepository(PoultryBatch)
        private readonly repository: Repository<PoultryBatch>,
    ) { }

    async execute(query: GetPoultryBatchesQuery): Promise<PoultryBatch[]> {
        return this.repository.find();
    }
}
