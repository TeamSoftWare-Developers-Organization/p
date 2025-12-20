import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { EquipmentController } from './equipment.controller';

// استيراد مستلمات الأوامر
import { CreateEquipmentHandler } from './commands/handlers/create-equipment.handler';
import { RemoveEquipmentHandler } from './commands/handlers/remove-equipment.handler';
import { UpdateEquipmentHandler } from './commands/handlers/Update Equipment.handler';

// استيراد مستلمات الاستعلامات
import { GetEquipmentHandler } from './queries/handlers/get-equipment.handler';
import { GetEquipmentsHandler } from './queries/handlers/get-equipments.handler';
import { Equipment } from 'src/Core Models/Equipment';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';

const CommandHandlers = [
  CreateEquipmentHandler,
  RemoveEquipmentHandler,
  UpdateEquipmentHandler,
];
const QueryHandlers = [GetEquipmentHandler, GetEquipmentsHandler];


@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment, MaintenanceSchedule]),
    CqrsModule,
  ],
  controllers: [EquipmentController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class EquipmentModule { }
