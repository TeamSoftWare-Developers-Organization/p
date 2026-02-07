import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { InventoryTakeDetail } from 'src/Core Models/InventoryTakeDetail';
import { CreateInventoryTakeDetailHandler } from './commands/handlers/create-inventory-take-detail.handler';
import { GetInventoryTakeDetailsHandler } from './queries/handlers/get-inventory-take-details.handler';

import { RemoveInventoryTakeDetailHandler } from './commands/handlers/remove-inventory-take-detail.handler';
import { InventoryTakeDetailController } from './inventory-take-detail.controller';

const CommandHandlers = [
    CreateInventoryTakeDetailHandler,
    RemoveInventoryTakeDetailHandler
];
const QueryHandlers = [GetInventoryTakeDetailsHandler];

@Module({
    imports: [TypeOrmModule.forFeature([InventoryTakeDetail]), CqrsModule],
    controllers: [InventoryTakeDetailController],
    providers: [...CommandHandlers, ...QueryHandlers],
})
export class InventoryTakeDetailModule { }
