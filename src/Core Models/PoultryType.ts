import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('poultry_types')
export class PoultryType {
    @PrimaryGeneratedColumn()
    TypeID: number;

    @Column({ length: 100 })
    TypeName: string;

    @Column({ length: 255, nullable: true })
    Description: string;

    @Column({ type: 'boolean', default: true })
    IsActive: boolean;
}
