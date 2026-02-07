import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInventoryTakeDetailCommand } from './commands/impl/create-inventory-take-detail.command';
import { RemoveInventoryTakeDetailCommand } from './commands/impl/remove-inventory-take-detail.command';
import { GetInventoryTakeDetailsQuery } from './queries/impl/get-inventory-take-details.query';
import { CreateInventoryTakeDetailDto } from './dto/create-inventory-take-detail.dto';
import { InventoryTakeDetail } from 'src/Core Models/InventoryTakeDetail';

@Controller('inventory-take-detail')
export class InventoryTakeDetailController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    create(@Body() dto: CreateInventoryTakeDetailDto): Promise<InventoryTakeDetail> {
        return this.commandBus.execute(new CreateInventoryTakeDetailCommand(dto));
    }

    @Get()
    findAll(): Promise<InventoryTakeDetail[]> {
        return this.queryBus.execute(new GetInventoryTakeDetailsQuery());
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.commandBus.execute(new RemoveInventoryTakeDetailCommand(id));
    }
}
