import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTreatmentScheduleDto } from './dto/CreateTreatmentScheduleDto';
import { CreateTreatmentScheduleCommand } from './command/CreateTreatmentSchedule.Command';

@Controller('treatment-schedules')
export class TreatmentScheduleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createTreatmentScheduleDto: CreateTreatmentScheduleDto) {
    // إرسال الأمر إلى Command Bus
    return this.commandBus.execute(
      new CreateTreatmentScheduleCommand(createTreatmentScheduleDto),
    );
  }

  // نقطة نهاية وهمية لجلب جدول واحد
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return `يعرض تفاصيل جدول العلاج رقم: ${id}`;
  }

  // نقطة نهاية وهمية لجلب جميع الجداول
  @Get()
  async findAll() {
    return 'يعرض قائمة بجميع جداول العلاج المسجلة.';
  }
}