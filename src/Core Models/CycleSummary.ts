import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { PoultryBatch } from './PoultryBatch';

@Entity('cycle_summaries')
export class CycleSummary {
    @PrimaryGeneratedColumn()
    SummaryID: number;

    @Column()
    BatchID: number;

    @Column({ type: 'date' })
    StartDate: Date;

    @Column({ type: 'date' })
    EndDate: Date;

    @Column()
    InitialBirds: number;

    @Column()
    TotalMortality: number;

    @Column()
    FinalBirds: number;

    @Column({ type: 'int' })
    CycleDurationDays: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    TotalFeedCost: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    TotalMedicationCost: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    TotalLaborCost: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    OtherExpenses: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    TotalExpenses: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    TotalRevenue: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    NetProfit: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    ProfitMargin: number; // نسبة الربح

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    MortalityRate: number; // نسبة النفوق

    @Column({ type: 'enum', enum: ['completed', 'archived'], default: 'completed' })
    Status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt: Date;

    @OneToOne(() => PoultryBatch)
    @JoinColumn({ name: 'BatchID' })
    Batch: PoultryBatch;
}
