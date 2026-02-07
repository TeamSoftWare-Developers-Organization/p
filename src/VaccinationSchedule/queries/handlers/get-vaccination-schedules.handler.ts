import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetVaccinationSchedulesQuery } from '../impl/get-vaccination-schedules.query';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';

@QueryHandler(GetVaccinationSchedulesQuery)
export class GetVaccinationSchedulesHandler implements IQueryHandler<GetVaccinationSchedulesQuery> {
    constructor(
        @InjectRepository(VaccinationSchedule)
        private readonly repository: Repository<VaccinationSchedule>,
    ) { }

    async execute(query: GetVaccinationSchedulesQuery): Promise<VaccinationSchedule[]> {
        return this.repository.find();
    }
}
