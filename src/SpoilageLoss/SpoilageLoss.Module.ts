import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSpoilageLossHandler } from './commands/handler/CreateSpoilageLossHandler';
import { SpoilageLoss } from 'src/Core Models/SpoilageLoss';
import { SpoilageLossController } from './SpoilageLoss.Controller';


export const CommandHandlers = [CreateSpoilageLossHandler];
export const QueryHandlers = []; 

@Module({
  imports: [
    TypeOrmModule.forFeature([SpoilageLoss]),
    CqrsModule,
  ],
  controllers: [SpoilageLossController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    // يجب إضافة الخدمات (Services) أو Repositories هنا
  ],
})
export class SpoilageLossModule {}