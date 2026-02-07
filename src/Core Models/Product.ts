import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    ProductID: number;

    @Column({ length: 100 })
    ProductName: string;

    @Column({ length: 255, nullable: true })
    Description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    UnitPrice: number;

    @Column('int', { default: 0 })
    StockQuantity: number;

    @Column({ type: 'boolean', default: true })
    IsActive: boolean;
}
