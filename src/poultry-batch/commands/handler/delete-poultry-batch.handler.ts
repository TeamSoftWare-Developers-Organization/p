import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeletePoultryBatchCommand } from '../impl/delete-poultry-batch.command';
import { PoultryBatch } from 'src/Core Models/PoultryBatch';

@CommandHandler(DeletePoultryBatchCommand)
export class DeletePoultryBatchHandler implements ICommandHandler<DeletePoultryBatchCommand> {
    constructor(
        @InjectRepository(PoultryBatch)
        private readonly repository: Repository<PoultryBatch>,
    ) { }

    async execute(command: DeletePoultryBatchCommand): Promise<void> {
        const { id } = command;
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`PoultryBatch with ID ${id} not found`);
        }
    }
}
