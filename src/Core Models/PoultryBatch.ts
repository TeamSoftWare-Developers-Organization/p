// في ملف: src/Core Models/PoultryBatch.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Slaughterhouse } from './slaughterhouse';
import { Shed } from './Shed';
import { SlaughterRecord } from './SlaughterRecord';

@Entity()
export class PoultryBatch {
  @PrimaryGeneratedColumn()
  BatchID: number;

  @Column()
  BatchName: string;

  @Column({ type: 'int', nullable: true })
  CoopID: number | null;

  @Column({ type: 'int', nullable: true })
  SlaughterhouseID: number | null;

  @Column({ type: 'int', nullable: true })
  BreedID: number | null;

  @Column({ type: 'int', default: 0 })
  ChickCount: number;

  @Column({ type: 'date', nullable: true })
  ArrivalDate: Date | null;

  @Column({ type: 'text', nullable: true })
  Description: string | null;

  @Column({
    type: 'enum',
    enum: ['Growing', 'Processing', 'Completed'],
    default: 'Growing',
  })
  Status: 'Growing' | 'Processing' | 'Completed';

  @ManyToOne(
    () => Slaughterhouse,
    (slaughterhouse) => slaughterhouse.PoultryBatches,
  )
  @JoinColumn({ name: 'SlaughterhouseID' })
  Slaughterhouse: Slaughterhouse;

  @ManyToOne(() => Shed, (shed) => shed.poultryBatches)
  @JoinColumn({ name: 'CoopID' })
  Coop: Shed;

  @OneToMany(() => SlaughterRecord, (record) => record.Batch)
  slaughterRecords: SlaughterRecord[];
}
