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
        const sheds = await this.shedRepository.find({
            relations: ['poultryBatches', 'mortalities']
        });

        return sheds.map(shed => {
            const totalChicks = (shed.poultryBatches || [])
                .filter(batch => batch.Status === 'Growing')
                .reduce((sum, batch) => sum + (batch.ChickCount || 0), 0);
            const totalMortality = (shed.mortalities || []).reduce((sum, m) => sum + (m.NumberOfBirds || 0), 0);
            shed.currentBirds = totalChicks - totalMortality;
            return shed;
        });
    }
}
