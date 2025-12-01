import { CreateShedDto } from '../../dto/create-shed.dto';
import { UpdateShedDto } from '../../dto/update-shed.dto';

export class CreateShedCommand {
    constructor(public readonly dto: CreateShedDto) { }
}

export class UpdateShedCommand {
    constructor(
        public readonly id: number,
        public readonly dto: UpdateShedDto,
    ) { }
}

export class RemoveShedCommand {
    constructor(public readonly id: number) { }
}
