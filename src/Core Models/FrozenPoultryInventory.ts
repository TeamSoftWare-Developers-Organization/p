// في ملف: src/frozen-poultry-inventory/frozen-poultry-inventory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Slaughterhouse } from './slaughterhouse';

@Entity()
export class FrozenPoultryInventory {
  @PrimaryGeneratedColumn()
  InventoryID: number;

  @Column()
  PoultryTypeID: number;

  @Column()
  Quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Weight: number;

  @Column({ type: 'date' })
  FreezeDate: Date;

  @Column({ type: 'int', nullable: true })
  SlaughterhouseID: number | null;

  @ManyToOne(() => Slaughterhouse, (s) => s.FrozenPoultryInventories)
  Slaughterhouse: Slaughterhouse;
}
