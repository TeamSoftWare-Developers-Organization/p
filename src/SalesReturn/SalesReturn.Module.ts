import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SalesReturnController } from './SalesReturn.Controller';
import { GetSalesReturnsHandler } from './Queries/Handlers/GetSalesReturnsHandler';
import { CreateSalesReturnHandler } from './Command/Handlers/CreateSalesReturnHandler';
import { RemoveSalesReturnHandler } from './Command/Handlers/RemoveSalesReturnHandler';
import { SalesReturn } from 'src/Core Models/SalesReturn';
import { SalesReturnDetail } from 'src/Core Models/SalesReturnDetail';

// استيراد الأوامر والاستعلامات

const CommandHandlers = [CreateSalesReturnHandler, RemoveSalesReturnHandler];
const QueryHandlers = [GetSalesReturnsHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesReturn, SalesReturnDetail]),
    CqrsModule,
  ],
  controllers: [SalesReturnController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class SalesReturnModule { }
