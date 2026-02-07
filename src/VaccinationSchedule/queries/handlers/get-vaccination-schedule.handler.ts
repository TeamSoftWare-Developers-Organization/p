import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetVaccinationScheduleQuery } from '../impl/get-vaccination-schedule.query';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';

@QueryHandler(GetVaccinationScheduleQuery)
export class GetVaccinationScheduleHandler implements IQueryHandler<GetVaccinationScheduleQuery> {
    constructor(
        @InjectRepository(VaccinationSchedule)
        private readonly repository: Repository<VaccinationSchedule>,
    ) { }

    async execute(query: GetVaccinationScheduleQuery): Promise<VaccinationSchedule> {
        const schedule = await this.repository.findOne({ where: { ScheduleID: query.id } });
        if (!schedule) {
            throw new NotFoundException(`VaccinationSchedule with ID ${query.id} not found`);
        }
        return schedule;
    }
}
