import { CreateChartOfAccountsDto } from '../../dto/create-chart-of-accounts.dto';

export class CreateChartOfAccountCommand {
    constructor(public readonly dto: CreateChartOfAccountsDto) { }
}
