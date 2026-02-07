import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePoultryBatchDto } from './dto/create-poultry-batch.dto';
import { UpdatePoultryBatchDto } from './dto/update-poultry-batch.dto';
import { GetPoultryBatchesQuery } from './queries/impl/get-poultry-batches.query';
import { GetPoultryBatchQuery } from './queries/impl/get-poultry-batch.query';
import { CreatePoultryBatchCommand } from './commands/impl/create-poultry-batch.command';
import { UpdatePoultryBatchCommand } from './commands/impl/update-poultry-batch.command';
import { DeletePoultryBatchCommand } from './commands/impl/delete-poultry-batch.command';
import { CloseCycleCommand } from './commands/impl/close-cycle.command';
import { CloseCycleDto } from './dto/close-cycle.dto';
import { PoultryBatch } from 'src/Core Models/PoultryBatch';

@Controller('poultry-batch')
export class PoultryBatchController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    create(@Body() createPoultryBatchDto: CreatePoultryBatchDto) {
        return this.commandBus.execute(new CreatePoultryBatchCommand(createPoultryBatchDto));
    }

    @Get()
    findAll(): Promise<PoultryBatch[]> {
        return this.queryBus.execute(new GetPoultryBatchesQuery());
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<PoultryBatch> {
        return this.queryBus.execute(new GetPoultryBatchQuery(id));
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePoultryBatchDto: UpdatePoultryBatchDto) {
        return this.commandBus.execute(new UpdatePoultryBatchCommand(id, updatePoultryBatchDto));
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(new DeletePoultryBatchCommand(id));
    }

    @Post(':id/close-cycle')
    closeCycle(@Param('id', ParseIntPipe) id: number, @Body() closeCycleDto: CloseCycleDto) {
        return this.commandBus.execute(new CloseCycleCommand(id, closeCycleDto));
    }
}
