import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteChartOfAccountCommand } from '../impl/delete-chart-of-account.command';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';

@CommandHandler(DeleteChartOfAccountCommand)
export class DeleteChartOfAccountHandler implements ICommandHandler<DeleteChartOfAccountCommand> {
    constructor(
        @InjectRepository(ChartOfAccounts)
        private readonly repository: Repository<ChartOfAccounts>,
    ) { }

    async execute(command: DeleteChartOfAccountCommand): Promise<void> {
        const { id } = command;
        await this.repository.delete({ AccountID: id });
    }
}
