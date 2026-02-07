import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMedicationsQuery } from '../impl/get-medications.query';
import { Medication } from 'src/Core Models/Medication';

@QueryHandler(GetMedicationsQuery)
export class GetMedicationsHandler implements IQueryHandler<GetMedicationsQuery> {
    constructor(
        @InjectRepository(Medication)
        private readonly repository: Repository<Medication>,
    ) { }

    async execute(query: GetMedicationsQuery): Promise<Medication[]> {
        return this.repository.find();
    }
}
