import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GeneralLedgerController } from './general-ledger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralLedger } from '../Core Models/GeneralLedger';
import { CreateGeneralLedgerHandler } from './commands/handlers/create-general-ledger.handler';
import { GetGeneralLedgersHandler } from './queries/handlers/get-general-ledgers.handler';

const CommandHandlers = [CreateGeneralLedgerHandler];
const QueryHandlers = [GetGeneralLedgersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([GeneralLedger])
  ],
  controllers: [GeneralLedgerController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class GeneralLedgerModule { }
