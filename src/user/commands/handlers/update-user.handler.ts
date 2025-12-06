import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserCommand } from '../impl/update-user.command';
import { User } from 'src/Core Models/User';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async execute(command: UpdateUserCommand): Promise<User> {
        const { id, dto } = command;
        const user = await this.userRepository.findOne({ where: { UserID: id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        Object.assign(user, dto);
        return await this.userRepository.save(user);
    }
}
