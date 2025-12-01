import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetShedQuery } from '../impl/get-shed.query';
import { Shed } from 'src/Core Models/Shed';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetShedQuery)
export class GetShedHandler implements IQueryHandler<GetShedQuery> {
    constructor(
        @InjectRepository(Shed)
        private readonly shedRepository: Repository<Shed>,
    ) { }

    async execute(query: GetShedQuery): Promise<Shed> {
        const { id } = query;
        const shed = await this.shedRepository.findOne({ where: { id } });
        if (!shed) {
            throw new NotFoundException(`Shed with ID ${id} not found`);
        }
        return shed;
    }
}
