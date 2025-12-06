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
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { RemoveUserCommand } from './commands/impl/remove-user.command';

// Queries
import { GetUserQuery } from './queries/impl/get-user.query';
import { GetUsersQuery } from './queries/impl/get-users.query';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/Core Models/User';

@Controller('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.commandBus.execute(new CreateUserCommand(dto));
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.queryBus.execute(new GetUsersQuery());
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.queryBus.execute(new GetUserQuery(id));
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        return this.commandBus.execute(new UpdateUserCommand(id, dto));
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.commandBus.execute(new RemoveUserCommand(id));
    }
}
