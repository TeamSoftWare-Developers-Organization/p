import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateChartOfAccountCommand } from '../impl/update-chart-of-account.command';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';

@CommandHandler(UpdateChartOfAccountCommand)
export class UpdateChartOfAccountHandler implements ICommandHandler<UpdateChartOfAccountCommand> {
    constructor(
        @InjectRepository(ChartOfAccounts)
        private readonly repository: Repository<ChartOfAccounts>,
    ) { }

    async execute(command: UpdateChartOfAccountCommand): Promise<ChartOfAccounts> {
        const { id, dto } = command;

        await this.repository.update(id, dto);
        const updatedAccount = await this.repository.findOneBy({ AccountID: id });

        if (!updatedAccount) {
            throw new NotFoundException(`Account with ID ${id} not found.`);
        }

        return updatedAccount;
    }
}
