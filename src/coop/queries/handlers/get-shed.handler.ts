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
        const shed = await this.shedRepository.findOne({
            where: { id },
            relations: ['poultryBatches', 'mortalities']
        });

        if (!shed) {
            throw new NotFoundException(`Shed with ID ${id} not found`);
        }

        const totalChicks = (shed.poultryBatches || [])
            .filter(batch => batch.Status === 'Growing')
            .reduce((sum, batch) => sum + (batch.ChickCount || 0), 0);
        const totalMortality = (shed.mortalities || []).reduce((sum, m) => sum + (m.NumberOfBirds || 0), 0);
        shed.currentBirds = totalChicks - totalMortality;

        return shed;
    }
}
