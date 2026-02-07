import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/Core Models/Product';
import { DeleteProductCommand } from '../impl/delete-product.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(command: DeleteProductCommand): Promise<void> {
        const result = await this.productRepository.delete(command.id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${command.id} not found`);
        }
    }
}
