import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleCommand } from '../impl/create-role.command';
import { Role } from 'src/Core Models/Role';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(command: CreateRoleCommand): Promise<Role> {
        const { dto } = command;
        const role = this.roleRepository.create(dto);
        return await this.roleRepository.save(role);
    }
}
