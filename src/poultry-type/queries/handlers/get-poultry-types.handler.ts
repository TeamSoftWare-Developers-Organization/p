import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoultryType } from 'src/Core Models/PoultryType';
import { GetPoultryTypesQuery } from '../impl/get-poultry-types.query';

@QueryHandler(GetPoultryTypesQuery)
export class GetPoultryTypesHandler implements IQueryHandler<GetPoultryTypesQuery> {
    constructor(
        @InjectRepository(PoultryType)
        private readonly poultryTypeRepository: Repository<PoultryType>,
    ) { }

    async execute(): Promise<PoultryType[]> {
        return this.poultryTypeRepository.find({
            where: { IsActive: true },
            order: { TypeName: 'ASC' },
        });
    }
}
