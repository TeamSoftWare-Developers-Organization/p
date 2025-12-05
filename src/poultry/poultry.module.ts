// src/poultry/poultry.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PoultryController } from './poultry.controller';
import { Poultry } from '../Core Models/Poultry';

// استيراد جميع مستلمات الأوامر
import { CreatePoultryHandler } from './commands/handlers/create-poultry.handler';
import { UpdatePoultryHandler } from './commands/handlers/update-poultry.handler';
import { RemovePoultryHandler } from './commands/handlers/remove-poultry.handler';

// استيراد جميع مستلمات الاستعلامات
import { GetPoultryHandler } from './queries/handlers/get-poultry.handler';
import { GetPoultriesHandler } from './queries/handlers/get-poultries.handler';

const CommandHandlers = [
  CreatePoultryHandler,
  UpdatePoultryHandler,
  RemovePoultryHandler,
];
const QueryHandlers = [GetPoultryHandler, GetPoultriesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Poultry]), CqrsModule],
  controllers: [PoultryController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class PoultryModule { }
