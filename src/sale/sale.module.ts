import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SaleController } from './sale.controller';

// استيراد مستلمات الأوامر
import { CreateSaleHandler } from './commands/handlers/create-sale.handler';
import { UpdateSaleHandler } from './commands/handlers/update-sale.handler';
import { RemoveSaleHandler } from './commands/handlers/remove-sale.handler';

// استيراد مستلمات الاستعلامات
import { GetSaleHandler } from './queries/handlers/get-sale.handler';
import { GetSalesHandler } from './queries/handlers/get-sales.handler';
import { Sale } from 'src/Core Models/Sale ';
import { SaleDetail } from 'src/Core Models/sale-detail';
import { Product } from 'src/Core Models/Product';
import { Poultry } from 'src/Core Models/Poultry';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';
import { EggInventory } from 'src/Core Models/EggInventory';

const CommandHandlers = [
  CreateSaleHandler,
  UpdateSaleHandler,
  RemoveSaleHandler,
];
const QueryHandlers = [GetSaleHandler, GetSalesHandler];

@Module({
  controllers: [SaleController],
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      SaleDetail,
      Poultry,
      FrozenPoultryInventory,
      EggInventory,
      Product
    ]),
    CqrsModule
  ],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class SaleModule { }
