import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveRoleCommand } from '../impl/remove-role.command';
import { Role } from 'src/Core Models/Role';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveRoleCommand)
export class RemoveRoleHandler implements ICommandHandler<RemoveRoleCommand> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(command: RemoveRoleCommand): Promise<void> {
        const { id } = command;
        const role = await this.roleRepository.findOne({ where: { RoleID: id } });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        await this.roleRepository.remove(role);
    }
}
