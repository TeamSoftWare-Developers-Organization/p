import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';
import { ChartOfAccountsController } from './chart-of-accounts.controller';
import { CreateChartOfAccountHandler } from './commands/handlers/create-chart-of-account.handler';
import { UpdateChartOfAccountHandler } from './commands/handlers/update-chart-of-account.handler';
import { DeleteChartOfAccountHandler } from './commands/handlers/delete-chart-of-account.handler';
import { GetChartOfAccountsHandler } from './queries/handlers/get-chart-of-accounts.handler';

export const CommandHandlers = [
  CreateChartOfAccountHandler,
  UpdateChartOfAccountHandler,
  DeleteChartOfAccountHandler,
];
export const QueryHandlers = [GetChartOfAccountsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ChartOfAccounts]),
  ],
  controllers: [ChartOfAccountsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ChartOfAccountsModule { }
