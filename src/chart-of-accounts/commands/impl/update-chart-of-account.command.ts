import { UpdateChartOfAccountDto } from '../../dto/update-chart-of-accounts.dto';

export class UpdateChartOfAccountCommand {
    constructor(
        public readonly id: number,
        public readonly dto: UpdateChartOfAccountDto,
    ) { }
}
