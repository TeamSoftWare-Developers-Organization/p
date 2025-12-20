import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseReturn } from 'src/Core Models/PurchaseReturn';
import { PurchaseReturnController } from './purchase-return.controller';
import { CreatePurchaseReturnHandler } from './commands/purchase-return-commands';
import { GetPurchaseReturnHandler, GetPurchaseReturnsListHandler } from './queries/purchase-return.queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseReturn]),
    CqrsModule
  ],
  controllers: [PurchaseReturnController],
  providers: [
    CreatePurchaseReturnHandler,
    GetPurchaseReturnHandler,
    GetPurchaseReturnsListHandler
  ],
})
export class PurchaseReturnModule { }
