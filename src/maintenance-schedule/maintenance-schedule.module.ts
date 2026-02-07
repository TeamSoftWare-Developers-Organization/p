import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceScheduleController } from './maintenance-schedule.controller';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';
import { UpdateMaintenanceScheduleHandler } from './commands/handlers/update-maintenance-schedule.handler';
import { GetMaintenanceScheduleHandler } from './queries/handlers/get-maintenance-schedule.handler';
import { UpdateMaintenanceScheduleCommand } from './commands/impl/update-maintenance-schedule.command';

import { GetMaintenanceSchedulesHandler } from './queries/handlers/get-maintenance-schedules.handler';

export const CommandHandlers = [UpdateMaintenanceScheduleCommand, UpdateMaintenanceScheduleHandler];
export const QueryHandlers = [GetMaintenanceScheduleHandler, GetMaintenanceSchedulesHandler];


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([MaintenanceSchedule]),
  ],
  controllers: [MaintenanceScheduleController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class MaintenanceScheduleModule {
  static MedicationModule: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>;
}
