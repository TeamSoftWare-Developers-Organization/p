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

// Import commands and queries for BiosecurityLog
import { GetBiosecurityLogByIdQuery } from './queries/Impl/get-biosecurity-log-by-id.query';
import { GetAllBiosecurityLogsQuery } from './queries/Impl/get-all-biosecurity-logs.query';
import { CreateBiosecurityLogDto } from './dto/create-biosecurity-log.dto';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';
import { UpdateBiosecurityLogDto } from './dto/update-biosecurity-log.dto';
import { CreateBiosecurityLogCommand } from './commands/Impi/create-biosecurity-log.command';
import { UpdateBiosecurityLogCommand } from './commands/Impi/update-biosecurity-log.command';
import { DeleteBiosecurityLogCommand } from './commands/Impi/delete-biosecurity-log.command';

@Controller('biosecurity-log')
export class BiosecurityLogController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  create(@Body() dto: CreateBiosecurityLogDto): Promise<BiosecurityLog> {
    return this.commandBus.execute(new CreateBiosecurityLogCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BiosecurityLog> {
    return this.queryBus.execute(new GetBiosecurityLogByIdQuery(id));
  }

  @Get()
  findAll(): Promise<BiosecurityLog[]> {
    return this.queryBus.execute(new GetAllBiosecurityLogsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBiosecurityLogDto,
  ): Promise<BiosecurityLog> {
    return this.commandBus.execute(new UpdateBiosecurityLogCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new DeleteBiosecurityLogCommand(id));
  }
}
