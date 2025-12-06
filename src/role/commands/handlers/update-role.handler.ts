import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRoleCommand } from '../impl/update-role.command';
import { Role } from 'src/Core Models/Role';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(command: UpdateRoleCommand): Promise<Role> {
        const { id, dto } = command;
        const role = await this.roleRepository.findOne({ where: { RoleID: id } });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        Object.assign(role, dto);
        return await this.roleRepository.save(role);
    }
}
