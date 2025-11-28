import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateVaccinationScheduleCommand } from './command/CreateVaccinationSchedule.Command';

@Controller('vaccination-schedules')
export class VaccinationScheduleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createVaccinationScheduleDto: CreateVaccinationScheduleCommand) {
    // إرسال الأمر إلى Command Bus
    return this.commandBus.execute(
      new CreateVaccinationScheduleCommand(createVaccinationScheduleDto),
    );
  }

  // نقطة نهاية وهمية لجلب جدول واحد
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return `يعرض تفاصيل جدول التطعيم رقم: ${id}`;
  }

  // نقطة نهاية وهمية لجلب جميع الجداول
  @Get()
  async findAll() {
    return 'يعرض قائمة بجميع جداول التطعيم المسجلة.';
  }
}