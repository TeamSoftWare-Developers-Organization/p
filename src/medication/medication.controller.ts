import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { GetMedicationsQuery } from './queries/impl/get-medications.query';
import { GetMedicationQuery } from './queries/impl/get-medication.query';
import { Medication } from 'src/Core Models/Medication';
import { CreateMedicationCommand } from './commands/Impl/create-medication.command';
import { UpdateMedicationCommand } from './commands/Impl/update-medication.command';
import { RemoveMedicationCommand } from './commands/Impl/remove-medication.command';

@Controller('medication')
export class MedicationController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

  @Post()
  create(@Body() dto: CreateMedicationDto): Promise<Medication> {
    return this.commandBus.execute(new CreateMedicationCommand(dto));
  }

  @Get()
  findAll(): Promise<Medication[]> {
    return this.queryBus.execute(new GetMedicationsQuery());
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Medication> {
    return this.queryBus.execute(new GetMedicationQuery(id));
  }


  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMedicationDto,
  ): Promise<Medication> {
    return this.commandBus.execute(new UpdateMedicationCommand(String(id), dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveMedicationCommand(id));
  }
}