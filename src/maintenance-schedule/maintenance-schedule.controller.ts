import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateMaintenanceScheduleDto } from './dto/update-maintenance-schedule.dto';
import { UpdateMaintenanceScheduleCommand } from './commands/impl/update-maintenance-schedule.command';
import { GetMaintenanceScheduleQuery } from './queries/impl/get-maintenance-schedule.query';
import { GetMaintenanceSchedulesQuery } from './queries/impl/get-maintenance-schedules.query';

@Controller('maintenance-schedule')
export class MaintenanceScheduleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }


  @Get()
  findAll() {
    return this.queryBus.execute(new GetMaintenanceSchedulesQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetMaintenanceScheduleQuery(+id));
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMaintenanceScheduleDto) {
    return this.commandBus.execute(new UpdateMaintenanceScheduleCommand(+id, dto));
  }
}
