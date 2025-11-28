import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTreatmentScheduleHandler } from './command/handler/CreateTreatmentSchedule.Handler';
import { TreatmentSchedule } from 'src/Core Models/TreatmentSchedule';
import { TreatmentScheduleController } from './TreatmentSchedule.Controller';

export const CommandHandlers = [CreateTreatmentScheduleHandler];
export const QueryHandlers = []; 

@Module({
  imports: [
    TypeOrmModule.forFeature([TreatmentSchedule]),
    CqrsModule,
  ],
  controllers: [TreatmentScheduleController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    // يجب إضافة الخدمات (Services) أو Repositories هنا
  ],
})
export class TreatmentScheduleModule {}