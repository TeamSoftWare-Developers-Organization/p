import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateChartOfAccountsDto } from './dto/create-chart-of-accounts.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-accounts.dto';
import { CreateChartOfAccountCommand } from './commands/impl/create-chart-of-account.command';
import { GetChartOfAccountsQuery } from './queries/impl/get-chart-of-accounts.query';

@Controller('chart-of-accounts')
export class ChartOfAccountsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  async create(@Body() dto: CreateChartOfAccountsDto) {
    return this.commandBus.execute(new CreateChartOfAccountCommand(dto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetChartOfAccountsQuery());
  }

  // Add Patch/Delete placeholders if handlers exist or implement them directly via repository for simplicity if needed, 
  // but let's stick to CQRS pattern if we want to be consistent. 
  // For now, let's just fix the 404 which is the main issue.
}

