import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRoleQuery } from '../impl/get-role.query';
import { Role } from 'src/Core Models/Role';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetRoleQuery)
export class GetRoleHandler implements IQueryHandler<GetRoleQuery> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(query: GetRoleQuery): Promise<Role> {
        const { id } = query;
        const role = await this.roleRepository.findOne({ where: { RoleID: id } });
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
}
