import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/Core Models/Product';
import { CreateProductCommand } from '../impl/create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(command: CreateProductCommand): Promise<Product> {
        const { createProductDto } = command;
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }
}
