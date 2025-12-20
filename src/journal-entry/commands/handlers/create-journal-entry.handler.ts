import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJournalEntryCommand } from '../impl/create-journal-entry.command';
import { JournalEntry } from 'src/Core Models/JournalEntry';
import { ChartOfAccounts } from 'src/Core Models/ChartOfAccounts';
import { JournalEntryDetail } from 'src/Core Models/JournalEntryDetail';

@CommandHandler(CreateJournalEntryCommand)
export class CreateJournalEntryHandler
  implements ICommandHandler<CreateJournalEntryCommand> {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccounts)
    private readonly chartOfAccountsRepository: Repository<ChartOfAccounts>,
  ) { }

  async execute(command: CreateJournalEntryCommand): Promise<JournalEntry> {
    const memo = command.createJournalEntryDto.memo;
    const details = (command.createJournalEntryDto as any).details ?? [];

    if (!Array.isArray(details)) {
      throw new Error('createJournalEntryDto.details must be an array');
    }

    const journalEntry = new JournalEntry();
    journalEntry.memo = memo;

    const detailEntities = await Promise.all(
      details.map(async (detailDto) => {
        const detail = new JournalEntryDetail();
        const account = await this.chartOfAccountsRepository.findOneBy({ AccountID: detailDto.accountId });
        if (!account) {
          throw new Error(`ChartOfAccounts with ID ${detailDto.accountId} not found.`);
        }
        detail.account = account;
        detail.type = detailDto.type;
        detail.amount = detailDto.amount;
        return detail;
      }),
    );

    journalEntry.details = detailEntities;

    return this.journalEntryRepository.save(journalEntry);
  }
}
