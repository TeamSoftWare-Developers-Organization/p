import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetInventoryTakeDetailsQuery } from '../impl/get-inventory-take-details.query';
import { InventoryTakeDetail } from 'src/Core Models/InventoryTakeDetail';

@QueryHandler(GetInventoryTakeDetailsQuery)
export class GetInventoryTakeDetailsHandler
    implements IQueryHandler<GetInventoryTakeDetailsQuery> {
    constructor(
        @InjectRepository(InventoryTakeDetail)
        private readonly repository: Repository<InventoryTakeDetail>,
    ) { }

    async execute(): Promise<InventoryTakeDetail[]> {
        return this.repository.find();
    }
}
