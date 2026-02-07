import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from 'src/Core Models/Product';
import { ProductController } from './product.controller';
import { GetProductsHandler } from './queries/handlers/get-products.handler';
import { GetProductHandler } from './queries/handlers/get-product.handler';
import { CreateProductHandler } from './commands/handlers/create-product.handler';
import { UpdateProductHandler } from './commands/handlers/update-product.handler';
import { DeleteProductHandler } from './commands/handlers/delete-product.handler';

const QueryHandlers = [GetProductsHandler, GetProductHandler];
const CommandHandlers = [CreateProductHandler, UpdateProductHandler, DeleteProductHandler];

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
    controllers: [ProductController],
    providers: [...QueryHandlers, ...CommandHandlers],
})
export class ProductModule { }
