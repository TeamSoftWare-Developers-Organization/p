import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReceiptDto } from './dto/CreateReceipt.dto';
import { CreateReceiptCommand } from './commands/createReceipt.command';

@Controller('receipts')
export class ReceiptController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createReceiptDto: CreateReceiptDto) {
    // إرسال الأمر إلى Command Bus
    return this.commandBus.execute(
      new CreateReceiptCommand(createReceiptDto),
    );
  }

  // نقطة نهاية وهمية لجلب إيصال واحد
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return `يعرض تفاصيل الإيصال رقم: ${id}`;
  }

  // نقطة نهاية وهمية لجلب كل الإيصالات
  @Get()
  async findAll() {
    return 'يعرض قائمة بجميع إيصالات الدفع المسجلة.';
  }
}