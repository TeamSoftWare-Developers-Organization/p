import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// استيراد الأوامر والاستعلامات
import { CreateVaccineCommand } from './commands/impl/create-vaccine.command';
import { UpdateVaccineCommand } from './commands/impl/update-vaccine.command';
import { RemoveVaccineCommand } from './commands/impl/remove-vaccine.command';
import { GetVaccineQuery } from './queries/impl/get-vaccine.query';
import { GetVaccinesQuery } from './queries/impl/get-vaccines.query';
import { Vaccine } from 'src/Core Models/Vaccine';
import { CreateVaccineDto } from './dto/create-vaccine.dto.ts/create-vaccine.dto.ts';
import { UpdateVaccineDto } from './dto/update-vaccine.dto.ts/update-vaccine.dto.ts';

@Controller('vaccine')
export class VaccineController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  create(@Body() dto: CreateVaccineDto): Promise<Vaccine> {
    return this.commandBus.execute(new CreateVaccineCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Vaccine> {
    return this.queryBus.execute(new GetVaccineQuery(id));
  }

  @Get()
  findAll(): Promise<Vaccine[]> {
    return this.queryBus.execute(new GetVaccinesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVaccineDto,
  ): Promise<Vaccine> {
    return this.commandBus.execute(new UpdateVaccineCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveVaccineCommand(id));
  }
}
