import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shed } from './Shed';

@Entity()
export class EggProduction {
  @PrimaryGeneratedColumn()
  EggProductionID: number;

  @Column()
  CoopID: number;

  @Column({ type: 'date' })
  ProductionDate: Date;

  @Column()
  NumberOfEggs: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  SpoilageRate: number | null;

  // الخصائص الملاحية
  @ManyToOne(() => Shed, (shed) => shed.eggProductions)
  Coop: Shed;
}
