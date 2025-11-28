import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateVaccinationScheduleHandler } from './command/handler/CreateVaccinationSchedule.Handler';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';
import { VaccinationScheduleController } from './VaccinationSchedule.Controller';


export const CommandHandlers = [CreateVaccinationScheduleHandler];
export const QueryHandlers = []; 

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
export class VaccinationScheduleModule {}