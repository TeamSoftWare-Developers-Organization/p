// في ملف: src/Core Models/PoultryBatch.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Slaughterhouse } from './slaughterhouse';
import { Shed } from './Shed';

@Entity()
export class PoultryBatch {
  @PrimaryGeneratedColumn()
  BatchID: number;

  @Column()
  BatchName: string;

  @Column({ type: 'int', nullable: true })
  CoopID: number | null;

  // other properties...

  @ManyToOne(
    () => Slaughterhouse,
    (slaughterhouse) => slaughterhouse.PoultryBatches,
  )
  Slaughterhouse: Slaughterhouse;

  @ManyToOne(() => Shed, (shed) => shed.poultryBatches)
  Coop: Shed;
}
