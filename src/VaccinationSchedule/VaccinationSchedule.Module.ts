import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateVaccinationScheduleHandler } from './command/handler/CreateVaccinationSchedule.Handler';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';
import { VaccinationScheduleController } from './VaccinationSchedule.Controller';


import { GetVaccinationSchedulesHandler } from './queries/handlers/get-vaccination-schedules.handler';
import { GetVaccinationScheduleHandler } from './queries/handlers/get-vaccination-schedule.handler';

export const CommandHandlers = [CreateVaccinationScheduleHandler];
export const QueryHandlers = [GetVaccinationSchedulesHandler, GetVaccinationScheduleHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccinationSchedule]),
    CqrsModule,
  ],
  controllers: [VaccinationScheduleController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    // يجب إضافة الخدمات (Services) أو Repositories هنا
  ],
})
export class VaccinationScheduleModule { }