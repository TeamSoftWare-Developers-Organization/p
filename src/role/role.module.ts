import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleController } from './role.controller';
import { Role } from 'src/Core Models/Role';

// Command Handlers
import { CreateRoleHandler } from './commands/handlers/create-role.handler';
import { UpdateRoleHandler } from './commands/handlers/update-role.handler';
import { RemoveRoleHandler } from './commands/handlers/remove-role.handler';

// Query Handlers
import { GetRoleHandler } from './queries/handlers/get-role.handler';
import { GetRolesHandler } from './queries/handlers/get-roles.handler';

const CommandHandlers = [
    CreateRoleHandler,
    UpdateRoleHandler,
    RemoveRoleHandler,
];

const QueryHandlers = [
    GetRoleHandler,
    GetRolesHandler,
];

@Module({
    imports: [TypeOrmModule.forFeature([Role]), CqrsModule],
    controllers: [RoleController],
    providers: [...CommandHandlers, ...QueryHandlers],
})
export class RoleModule { }
