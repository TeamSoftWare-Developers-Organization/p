import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialTransactionController } from './financial-transaction.controller';
import { GetFinancialTransactionHandler } from './queries/handlers/get-financial-transaction.handler';
import { GetFinancialTransactionsListHandler } from './queries/handlers/get-financial-transactions-list.handler';
import { CreateFinancialTransactionHandler } from './commands/impi/handler/create-financial-transaction.handler';
import { RemoveFinancialTransactionHandler } from './commands/impi/handler/remove-financial-transaction.handler';
import { UpdateFinancialTransactionHandler } from './commands/impi/handler/update-financial-transaction.handler';
import { FinancialTransaction } from 'src/Core Models/FinancialTransaction';

export const CommandHandlers = [
  CreateFinancialTransactionHandler,
  UpdateFinancialTransactionHandler,
  RemoveFinancialTransactionHandler,
];
export const QueryHandlers = [
  GetFinancialTransactionHandler,
  GetFinancialTransactionsListHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([FinancialTransaction]), CqrsModule],
  controllers: [FinancialTransactionController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class FinancialTransactionModule { }
