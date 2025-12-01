// src/coop/coop.controller.ts
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

// استيراد الأوامر
import {
  CreateShedCommand,
  RemoveShedCommand,
  UpdateShedCommand,
} from './commands/impl/create-shed.command';

// استيراد الاستعلامات
import { GetShedQuery, GetShedsQuery } from './queries/impl/get-shed.query';

// استيراد DTOs
import { CreateShedDto } from './dto/create-shed.dto';
import { UpdateShedDto } from './dto/update-shed.dto';
import { Shed } from 'src/Core Models/Shed';

@Controller('sheds')
export class CoopController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  create(@Body() dto: CreateShedDto): Promise<Shed> {
    return this.commandBus.execute(new CreateShedCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Shed> {
    return this.queryBus.execute(new GetShedQuery(id));
  }

  @Get()
  findAll(): Promise<Shed[]> {
    return this.queryBus.execute(new GetShedsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShedDto,
  ): Promise<Shed> {
    return this.commandBus.execute(new UpdateShedCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveShedCommand(id));
  }
}
