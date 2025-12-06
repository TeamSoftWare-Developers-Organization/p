import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from 'src/Core Models/User';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async execute(command: CreateUserCommand): Promise<User> {
        const { dto } = command;
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }
}
