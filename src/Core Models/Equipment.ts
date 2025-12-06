// في ملف: src/equipment/equipment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MaintenanceSchedule } from './MaintenanceSchedule';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  EquipmentID: number;

  @Column({ length: 100 })
  Name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Description: string | null;

  @Column({ type: 'date' })
  PurchaseDate: Date;

  @Column({ length: 50 })
  Status: string;

  @OneToMany(
    () => MaintenanceSchedule,
    (schedule: MaintenanceSchedule) => schedule.Equipment,
  )
  MaintenanceSchedules: MaintenanceSchedule[];
}
