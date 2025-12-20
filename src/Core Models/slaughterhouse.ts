// في ملف: src/slaughterhouse/slaughterhouse.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PoultryBatch } from './PoultryBatch';
import { FrozenPoultryInventory } from './FrozenPoultryInventory';

@Entity()
export class Slaughterhouse {
  @PrimaryGeneratedColumn()
  SlaughterhouseID: number;

  @Column({ length: 100 })
  Name: string;

  @Column({ length: 255, nullable: true })
  Address: string;

  @Column({ length: 50, nullable: true })
  LicenseNumber: string;

  @Column({ length: 50, nullable: true })
  Status: string;

  @OneToMany(() => PoultryBatch, (batch) => batch.Slaughterhouse)
  PoultryBatches: PoultryBatch[];

  @OneToMany(
    () => FrozenPoultryInventory,
    (inventory) => inventory.Slaughterhouse,
  )
  FrozenPoultryInventories: FrozenPoultryInventory[];
}
