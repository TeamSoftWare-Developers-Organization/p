// في ملف: src/chart-of-accounts/chart-of-accounts.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FinancialTransaction } from './FinancialTransaction';

@Entity()
export class ChartOfAccounts {
  @PrimaryGeneratedColumn()
  AccountID: number;

  @Column({ length: 100 })
  AccountName: string;

  @Column({ length: 50 })
  AccountType: string;

  // علاقات ذاتية المرجعية
  @OneToMany(
    () => FinancialTransaction,
    (transaction: FinancialTransaction) => transaction.DebitAccount,
  )
  DebitTransactions: FinancialTransaction[];

  @OneToMany(
    () => FinancialTransaction,
    (transaction: FinancialTransaction) => transaction.CreditAccount,
  )
  CreditTransactions: FinancialTransaction[];
}
