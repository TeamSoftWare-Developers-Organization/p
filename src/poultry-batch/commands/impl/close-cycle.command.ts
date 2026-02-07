import { CloseCycleDto } from '../../dto/close-cycle.dto';

export class CloseCycleCommand {
    constructor(
        public readonly batchId: number,
        public readonly closeCycleDto: CloseCycleDto
    ) { }
}
