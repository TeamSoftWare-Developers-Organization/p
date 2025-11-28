import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateReceiptHandler } from './commands/handler/createReceipt.handler';
import { Receipt } from 'src/Core Models/Receipt';
import { ReceiptController } from './Receipt.Controller';

// استيراد معالجات الأوامر

export const CommandHandlers = [CreateReceiptHandler];
export const QueryHandlers = []; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipt]),
    CqrsModule,
  ],
  controllers: [ReceiptController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    // يجب إضافة الخدمات (Services) أو Repositories هنا
  ],
})
export class ReceiptModule {}