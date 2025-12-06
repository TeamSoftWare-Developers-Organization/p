import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { User } from 'src/Core Models/User';

// Command Handlers
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { RemoveUserHandler } from './commands/handlers/remove-user.handler';

// Query Handlers
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { GetUsersHandler } from './queries/handlers/get-users.handler';

const CommandHandlers = [
    CreateUserHandler,
    UpdateUserHandler,
    RemoveUserHandler,
];

const QueryHandlers = [
    GetUserHandler,
    GetUsersHandler,
];

@Module({
    imports: [TypeOrmModule.forFeature([User]), CqrsModule],
    controllers: [UserController],
    providers: [...CommandHandlers, ...QueryHandlers],
})
export class UserModule { }
