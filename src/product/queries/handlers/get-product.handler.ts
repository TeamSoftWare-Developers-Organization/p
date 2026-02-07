import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/Core Models/Product';
import { GetProductQuery } from '../impl/get-product.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(query: GetProductQuery): Promise<Product> {
        const product = await this.productRepository.findOneBy({ ProductID: query.id });
        if (!product) {
            throw new NotFoundException(`Product with ID ${query.id} not found`);
        }
        return product;
    }
}
