import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateVaccinationScheduleCommand } from './command/CreateVaccinationSchedule.Command';
import { GetVaccinationSchedulesQuery } from './queries/impl/get-vaccination-schedules.query';
import { GetVaccinationScheduleQuery } from './queries/impl/get-vaccination-schedule.query';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';

@Controller('vaccination-schedule')
export class VaccinationScheduleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  async create(@Body() createVaccinationScheduleDto: any) {
    return this.commandBus.execute(
      new CreateVaccinationScheduleCommand(createVaccinationScheduleDto),
    );
  }

  @Get()
  async findAll(): Promise<VaccinationSchedule[]> {
    return this.queryBus.execute(new GetVaccinationSchedulesQuery());
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VaccinationSchedule> {
    return this.queryBus.execute(new GetVaccinationScheduleQuery(id));
  }
}
