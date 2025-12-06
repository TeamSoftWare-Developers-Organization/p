import { UpdateRoleDto } from '../../dto/update-role.dto';

export class UpdateRoleCommand {
    constructor(
        public readonly id: number,
        public readonly dto: UpdateRoleDto,
    ) { }
}
