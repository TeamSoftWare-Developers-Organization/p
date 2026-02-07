import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateChartOfAccountsDto } from './dto/create-chart-of-accounts.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-accounts.dto';
import { CreateChartOfAccountCommand } from './commands/impl/create-chart-of-account.command';
import { UpdateChartOfAccountCommand } from './commands/impl/update-chart-of-account.command';
import { DeleteChartOfAccountCommand } from './commands/impl/delete-chart-of-account.command';
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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChartOfAccountDto,
  ) {
    return this.commandBus.execute(new UpdateChartOfAccountCommand(id, dto));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteChartOfAccountCommand(id));
  }
}

