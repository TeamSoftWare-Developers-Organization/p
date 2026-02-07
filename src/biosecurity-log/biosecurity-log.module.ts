import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BiosecurityLogController } from './biosecurity-log.controller';

// Import command handlers
import { CreateBiosecurityLogHandler } from './commands/handlers/create-biosecurity-log.handler';
import { UpdateBiosecurityLogHandler } from './commands/handlers/update-biosecurity-log.handler';
import { DeleteBiosecurityLogHandler } from './commands/handlers/delete-biosecurity-log.handler';

// Import query handlers
import { GetBiosecurityLogByIdHandler } from './queries/handlers/get-biosecurity-log-by-id.handler';
import { GetAllBiosecurityLogsHandler } from './queries/handlers/get-all-biosecurity-logs.handler';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';

const CommandHandlers = [
  CreateBiosecurityLogHandler,
  UpdateBiosecurityLogHandler,
  DeleteBiosecurityLogHandler,
];
const QueryHandlers = [
  GetBiosecurityLogByIdHandler,
  GetAllBiosecurityLogsHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([BiosecurityLog]), CqrsModule],
  controllers: [BiosecurityLogController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class BiosecurityLogModule { }
