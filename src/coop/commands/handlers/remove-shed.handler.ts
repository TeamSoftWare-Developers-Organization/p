import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveShedCommand } from '../impl/create-shed.command';
import { Shed } from 'src/Core Models/Shed';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RemoveShedCommand)
export class RemoveShedHandler implements ICommandHandler<RemoveShedCommand> {
    constructor(
        @InjectRepository(Shed)
        private readonly shedRepository: Repository<Shed>,
    ) { }

    async execute(command: RemoveShedCommand): Promise<void> {
        const { id } = command;
        const result = await this.shedRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Shed with ID ${id} not found`);
        }
    }
}
