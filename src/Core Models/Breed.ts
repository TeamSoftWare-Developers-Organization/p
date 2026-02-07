import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Poultry } from './Poultry';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  BreedID: number;
  @Column({ length: 100 })
  BreedName: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  Description: string | null;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  DefaultPrice: number;

  @OneToMany(() => Poultry, (poultry: Poultry) => poultry.BreedRelation)
  Poultries: Poultry[];
}
