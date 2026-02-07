import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoultryBatchController } from './poultry-batch.controller';
import { PoultryBatch } from 'src/Core Models/PoultryBatch';
import { CreatePoultryBatchHandler } from './commands/handler/create-poultry-batch.handler';
import { UpdatePoultryBatchHandler } from './commands/handler/update-poultry-batch.handler';
import { DeletePoultryBatchHandler } from './commands/handler/delete-poultry-batch.handler';
import { GetPoultryBatchesHandler } from './queries/handlers/get-poultry-batches.handler';
import { GetPoultryBatchHandler } from './queries/handlers/get-poultry-batch.handler';
import { CloseCycleHandler } from './commands/handler/close-cycle.handler';
import { SlaughterRecord } from 'src/Core Models/SlaughterRecord';
import { CycleSummary } from 'src/Core Models/CycleSummary';
import { Shed } from 'src/Core Models/Shed';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';
import { Mortality } from 'src/Core Models/Mortality';

export const CommandHandlers = [
  CreatePoultryBatchHandler,
  UpdatePoultryBatchHandler,
  DeletePoultryBatchHandler,
  CloseCycleHandler,
];
export const QueryHandlers = [
  GetPoultryBatchesHandler,
  GetPoultryBatchHandler
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      PoultryBatch,
      SlaughterRecord,
      CycleSummary,
      Shed,
      FrozenPoultryInventory,
      Mortality,
    ]),
  ],
  controllers: [PoultryBatchController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
})
export class PoultryBatchModule { }
