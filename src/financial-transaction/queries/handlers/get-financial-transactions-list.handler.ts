import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFinancialTransactionsListQuery } from '../impl/get-financial-transactions-list.query';
import { FinancialTransaction } from 'src/Core Models/FinancialTransaction';

@QueryHandler(GetFinancialTransactionsListQuery)
export class GetFinancialTransactionsListHandler implements IQueryHandler<GetFinancialTransactionsListQuery> {
  constructor(
    @InjectRepository(FinancialTransaction)
    private readonly repository: Repository<FinancialTransaction>,
  ) { }

  async execute(query: GetFinancialTransactionsListQuery): Promise<FinancialTransaction[]> {
    return this.repository.find();
  }
}
