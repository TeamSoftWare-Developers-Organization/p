import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';
import { CreateChartOfAccountCommand } from '../impl/create-chart-of-account.command';

@CommandHandler(CreateChartOfAccountCommand)
export class CreateChartOfAccountHandler
    implements ICommandHandler<CreateChartOfAccountCommand> {
    constructor(
        @InjectRepository(ChartOfAccounts)
        private readonly repository: Repository<ChartOfAccounts>,
    ) { }

    async execute(command: CreateChartOfAccountCommand): Promise<ChartOfAccounts> {
        const { dto } = command;
        const account = this.repository.create({
            AccountName: dto.AccountName,
            AccountType: dto.AccountType,
        });
        return this.repository.save(account);
    }
}
