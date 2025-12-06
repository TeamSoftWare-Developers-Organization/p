import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Commands
import { CreateRoleCommand } from './commands/impl/create-role.command';
import { UpdateRoleCommand } from './commands/impl/update-role.command';
import { RemoveRoleCommand } from './commands/impl/remove-role.command';

// Queries
import { GetRoleQuery } from './queries/impl/get-role.query';
import { GetRolesQuery } from './queries/impl/get-roles.query';

// DTOs
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/Core Models/Role';

@Controller('role')
export class RoleController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    create(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.commandBus.execute(new CreateRoleCommand(dto));
    }

    @Get()
    findAll(): Promise<Role[]> {
        return this.queryBus.execute(new GetRolesQuery());
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        return this.queryBus.execute(new GetRoleQuery(id));
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRoleDto,
    ): Promise<Role> {
        return this.commandBus.execute(new UpdateRoleCommand(id, dto));
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.commandBus.execute(new RemoveRoleCommand(id));
    }
}
