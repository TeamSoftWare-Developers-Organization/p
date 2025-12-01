import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CoopController } from './coop.controller';

// استيراد مستلمات الأوامر
import { CreateShedHandler } from './commands/handlers/create-shed.handler';
import { UpdateShedHandler } from './commands/handlers/update-shed.handler';
import { RemoveShedHandler } from './commands/handlers/remove-shed.handler';

// استيراد مستلمات الاستعلامات
import { GetShedHandler } from './queries/handlers/get-shed.handler';
import { GetShedsHandler } from './queries/handlers/get-sheds.handler';
import { Shed } from 'src/Core Models/Shed';

const CommandHandlers = [
  CreateShedHandler,
  UpdateShedHandler,
  RemoveShedHandler,
];
const QueryHandlers = [GetShedHandler, GetShedsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Shed]), CqrsModule],
  controllers: [CoopController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class CoopModule { }
