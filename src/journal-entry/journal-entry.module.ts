import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateJournalEntryHandler } from './commands/handlers/create-journal-entry.handler';
import { GetJournalEntryHandler } from './queries/handlers/get-journal-entry.handler';
import { JournalEntryController } from './journal-entry.controller';
import { JournalEntry } from 'src/Core Models/JournalEntry';
import { JournalEntryDetail } from 'src/Core Models/JournalEntryDetail';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';

export const CommandHandlers = [CreateJournalEntryHandler];
export const QueryHandlers = [GetJournalEntryHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([JournalEntry, JournalEntryDetail, ChartOfAccounts]),
  ],
  controllers: [JournalEntryController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class JournalEntryModule { }
