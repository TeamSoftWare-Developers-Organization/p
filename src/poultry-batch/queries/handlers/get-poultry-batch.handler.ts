import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetPoultryBatchQuery } from '../impl/get-poultry-batch.query';
import { PoultryBatch } from 'src/Core Models/PoultryBatch';

@QueryHandler(GetPoultryBatchQuery)
export class GetPoultryBatchHandler implements IQueryHandler<GetPoultryBatchQuery> {
    constructor(
        @InjectRepository(PoultryBatch)
        private readonly repository: Repository<PoultryBatch>,
    ) { }

    async execute(query: GetPoultryBatchQuery): Promise<PoultryBatch> {
        const batch = await this.repository.findOne({ where: { BatchID: query.id } });
        if (!batch) {
            throw new NotFoundException(`PoultryBatch with ID ${query.id} not found`);
        }
        return batch;
    }
}
