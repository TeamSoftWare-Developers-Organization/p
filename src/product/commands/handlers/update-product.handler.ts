import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/Core Models/Product';
import { UpdateProductCommand } from '../impl/update-product.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(command: UpdateProductCommand): Promise<Product> {
        const { id, updateProductDto } = command;
        const product = await this.productRepository.findOneBy({ ProductID: id });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        this.productRepository.merge(product, updateProductDto);
        return this.productRepository.save(product);
    }
}
