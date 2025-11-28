import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSpoilageLossDto } from './dto/createSpoilageLoss.dto';
import { CreateSpoilageLossCommand } from './commands/CreateSpoilageLoss.Command';
@Controller('spoilage-losses')
export class SpoilageLossController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createSpoilageLossDto: CreateSpoilageLossDto) {
    // إرسال الأمر إلى Command Bus
    return this.commandBus.execute(
      new CreateSpoilageLossCommand(createSpoilageLossDto),
    );
  }

  // نقطة نهاية وهمية لجلب سجل خسارة واحد
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return `يعرض تفاصيل سجل الخسارة رقم: ${id}`;
  }

  // نقطة نهاية وهمية لجلب جميع سجلات الخسارة
  @Get()
  async findAll() {
    return 'يعرض قائمة بجميع سجلات الخسائر والتلف المسجلة.';
  }
}