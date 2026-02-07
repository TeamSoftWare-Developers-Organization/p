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

const CommandHandlers = [
  CreateSaleHandler,
  UpdateSaleHandler,
  RemoveSaleHandler,
];
const QueryHandlers = [GetSaleHandler, GetSalesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleDetail]), CqrsModule],
  controllers: [SaleController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class SaleModule { }
