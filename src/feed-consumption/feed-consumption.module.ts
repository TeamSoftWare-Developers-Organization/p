import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedConsumptionController } from './feed-consumption.controller';

// استيراد مستلمات الاستعلامات
import { GetFeedConsumptionHandler } from './queries/handlers/get-feed-consumption.handler';
import { GetFeedConsumptionsListHandler } from './queries/handlers/get-feed-consumptions-list.handler';
import { CreateFeedConsumptionHandler } from './commands/Handler/create-feed-consumption.handler';
import { UpdateFeedConsumptionHandler } from './commands/Handler/update-feed-consumption.command';
import { RemoveFeedConsumptionHandler } from './commands/Handler/remove-feed-consumption.handler';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';
import { Coop } from 'src/Core Models/Shedس';
import { Feed } from 'src/Core Models/Feed';

const CommandHandlers = [
  CreateFeedConsumptionHandler,
  UpdateFeedConsumptionHandler,
  RemoveFeedConsumptionHandler,
];
const QueryHandlers = [
  GetFeedConsumptionHandler,
  GetFeedConsumptionsListHandler,
];

@Module({
  imports: [
    // ربط الكيانات التي تتعامل معها هذه الوحدة
    TypeOrmModule.forFeature([FeedConsumption, Coop, Feed]),
    CqrsModule,
  ],
  controllers: [FeedConsumptionController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class FeedConsumptionModule { }
