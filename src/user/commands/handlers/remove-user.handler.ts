import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveUserCommand } from '../impl/remove-user.command';
import { User } from 'src/Core Models/User';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async execute(command: RemoveUserCommand): Promise<void> {
        const { id } = command;
        const user = await this.userRepository.findOne({ where: { UserID: id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.userRepository.remove(user);
    }
}
