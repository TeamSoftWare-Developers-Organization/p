import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Feed } from './Feed';
import { Shed } from './Shed';


@Entity()
export class FeedConsumption {
  @PrimaryGeneratedColumn()
  FeedConsumptionID: number;

  @Column({ type: 'date' })
  ConsumptionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Quantity: number;

  @ManyToOne(() => Feed, (feed) => feed.FeedConsumptions)
  Feed: Feed;

  @ManyToOne(() => Shed, (shed) => shed.feedConsumptions)
  Shed: Shed;
}

