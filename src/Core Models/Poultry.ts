import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Shed } from './Shed';
import { Breed } from './Breed';
import { HealthLog } from './HealthLog';
import { PurchaseDetail } from './purchase-detail';

@Entity()
export class Poultry {
  @PrimaryGeneratedColumn()
  PoultryID: number;

  @Column({ length: 50 })
  Breed: string;

  @Column({ type: 'date', nullable: true })
  HatchDate: Date | null;

  @Column({ type: 'int', nullable: true })
  BreedID: number | null;

  @ManyToOne(() => Shed, (shed) => shed.poultries)
  Coop: Shed;

  @ManyToOne(() => Breed, (breed) => breed.Poultries)
  BreedRelation: Breed;

  @OneToMany(() => HealthLog, (healthLog: HealthLog) => healthLog.Poultry)
  HealthLogs: HealthLog[];

  @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail: PurchaseDetail) => purchaseDetail.Poultry,
  )
  PurchaseDetails: PurchaseDetail[];
}
