import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRolesQuery } from '../impl/get-roles.query';
import { Role } from 'src/Core Models/Role';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(query: GetRolesQuery): Promise<Role[]> {
        return await this.roleRepository.find();
    }
}
