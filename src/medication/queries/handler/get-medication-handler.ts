import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetMedicationQuery } from '../impl/get-medication.query';
import { Medication } from 'src/Core Models/Medication';

@QueryHandler(GetMedicationQuery)
export class GetMedicationHandler implements IQueryHandler<GetMedicationQuery> {
    constructor(
        @InjectRepository(Medication)
        private readonly repository: Repository<Medication>,
    ) { }

    async execute(query: GetMedicationQuery): Promise<Medication> {
        const medication = await this.repository.findOne({ where: { MedicationID: query.id } });
        if (!medication) {
            throw new NotFoundException(`Medication with ID ${query.id} not found`);
        }
        return medication;
    }
}
