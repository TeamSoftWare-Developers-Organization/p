import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PoultryBatch } from './PoultryBatch';
import { Slaughterhouse } from './slaughterhouse';

@Entity('slaughter_records')
export class SlaughterRecord {
    @PrimaryGeneratedColumn()
    RecordID: number;

    @Column()
    BatchID: number;

    @Column()
    SlaughterhouseID: number;

    @Column({ type: 'date' })
    TransferDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    LiveWeight: number; // الوزن القائم

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    DressedWeight: number; // الوزن الصافي

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    DressingPercentage: number; // نسبة التصافي

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    PricePerKg: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    TotalRevenue: number;

    @Column({ type: 'text', nullable: true })
    Notes: string;

    @ManyToOne(() => PoultryBatch, (batch) => batch.slaughterRecords)
    @JoinColumn({ name: 'BatchID' })
    Batch: PoultryBatch;

    @ManyToOne(() => Slaughterhouse, (slaughterhouse) => slaughterhouse.slaughterRecords)
    @JoinColumn({ name: 'SlaughterhouseID' })
    Slaughterhouse: Slaughterhouse;
}
