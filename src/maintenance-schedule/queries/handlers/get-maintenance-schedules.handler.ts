import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMaintenanceSchedulesQuery } from '../impl/get-maintenance-schedules.query';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';

@QueryHandler(GetMaintenanceSchedulesQuery)
export class GetMaintenanceSchedulesHandler implements IQueryHandler<GetMaintenanceSchedulesQuery> {
    constructor(
        @InjectRepository(MaintenanceSchedule)
        private readonly repository: Repository<MaintenanceSchedule>,
    ) { }

    async execute(query: GetMaintenanceSchedulesQuery): Promise<MaintenanceSchedule[]> {
        return this.repository.find();
    }
}
