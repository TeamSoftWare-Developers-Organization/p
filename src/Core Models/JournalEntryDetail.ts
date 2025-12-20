import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { JournalEntry } from './JournalEntry';
import { ChartOfAccounts } from './ChartOfAccounts';

@Entity()
export class JournalEntryDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => JournalEntry, (journalEntry) => journalEntry.details)
  journalEntry: JournalEntry;

  @ManyToOne(() => ChartOfAccounts)
  account: ChartOfAccounts;

  @Column()
  type: 'DEBIT' | 'CREDIT';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
}
