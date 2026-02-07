import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveInventoryTakeDetailCommand } from '../impl/remove-inventory-take-detail.command';
import { InventoryTakeDetail } from 'src/Core Models/InventoryTakeDetail';

@CommandHandler(RemoveInventoryTakeDetailCommand)
export class RemoveInventoryTakeDetailHandler
    implements ICommandHandler<RemoveInventoryTakeDetailCommand> {
    constructor(
        @InjectRepository(InventoryTakeDetail)
        private readonly repository: Repository<InventoryTakeDetail>,
    ) { }

    async execute(command: RemoveInventoryTakeDetailCommand): Promise<void> {
        const { id } = command;
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`InventoryTakeDetail with ID ${id} not found`);
        }
    }
}
