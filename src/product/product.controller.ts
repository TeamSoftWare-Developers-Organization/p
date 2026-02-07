import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { GetProductQuery } from './queries/impl/get-product.query';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { DeleteProductCommand } from './commands/impl/delete-product.command';

@Controller('products')
export class ProductController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get()
    findAll() {
        return this.queryBus.execute(new GetProductsQuery());
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.queryBus.execute(new GetProductQuery(+id));
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.commandBus.execute(new CreateProductCommand(createProductDto));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.commandBus.execute(new UpdateProductCommand(+id, updateProductDto));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commandBus.execute(new DeleteProductCommand(+id));
    }
}
