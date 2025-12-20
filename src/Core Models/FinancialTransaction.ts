// في ملف: src/financial-transaction/financial-transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ChartOfAccounts } from './ChartOfAccounts';

@Entity()
export class FinancialTransaction {
  @PrimaryGeneratedColumn()
  TransactionID: number;

  @Column()
  DebitAccountID: number;

  @Column()
  CreditAccountID: number;

  @Column({ type: 'date' })
  TransactionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number;

  @Column({ length: 255 })
  Description: string;

  @ManyToOne(() => ChartOfAccounts, (account) => account.DebitTransactions)
  DebitAccount: ChartOfAccounts;

  @ManyToOne(() => ChartOfAccounts, (account) => account.CreditTransactions)
  CreditAccount: ChartOfAccounts;
}
