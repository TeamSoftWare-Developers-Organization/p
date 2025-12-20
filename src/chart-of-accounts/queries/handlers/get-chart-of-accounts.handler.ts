import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';
import { GetChartOfAccountsQuery } from '../impl/get-chart-of-accounts.query';

@QueryHandler(GetChartOfAccountsQuery)
export class GetChartOfAccountsHandler
    implements IQueryHandler<GetChartOfAccountsQuery> {
    constructor(
        @InjectRepository(ChartOfAccounts)
        private readonly repository: Repository<ChartOfAccounts>,
    ) { }

    async execute(): Promise<ChartOfAccounts[]> {
        return this.repository.find();
    }
}
