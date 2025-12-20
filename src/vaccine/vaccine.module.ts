import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { VaccineController } from './vaccine.controller';

// استيراد مستلمات الأوامر
import { CreateVaccineHandler } from './commands/handlers/create-vaccine.handler';
import { UpdateVaccineHandler } from './commands/handlers/update-vaccine.handler';
import { RemoveVaccineHandler } from './commands/handlers/remove-vaccine.handler';

// استيراد مستلمات الاستعلامات
import { GetVaccineHandler } from './queries/handlers/get-vaccine.handler';
import { GetVaccinesHandler } from './queries/handlers/get-vaccines.handler';
import { HealthLog } from 'src/Core Models/HealthLog';
import { Vaccine } from 'src/Core Models/Vaccine';

const CommandHandlers = [
  CreateVaccineHandler,
  UpdateVaccineHandler,
  RemoveVaccineHandler,
];
const QueryHandlers = [GetVaccineHandler, GetVaccinesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine, HealthLog]), CqrsModule],
  controllers: [VaccineController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class VaccineModule { }
