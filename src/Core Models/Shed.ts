import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Farm } from './Farm';
import { Poultry } from './Poultry';
import { EggProduction } from './EggProduction';
import { Mortality } from './Mortality';
import { TreatmentSchedule } from './TreatmentSchedule';
import { PoultryBatch } from './PoultryBatch';

@Entity('sheds')
export class Shed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50, nullable: true })
    type: string; // نوع الدواجن (دجاج بياض، دجاج لاحم، دجاج محلي)

    @Column()
    capacity: number;

    @Column({ default: 0 })
    currentBirds: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    temperature: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    humidity: number;

    @Column({
        type: 'enum',
        enum: ['active', 'maintenance', 'inactive'],
        default: 'active'
    })
    status: 'active' | 'maintenance' | 'inactive';

    @Column({ type: 'date', nullable: true })
    lastCleaned: Date;

    @Column({ nullable: true })
    farmID: number | null;

    // العلاقات
    @ManyToOne(() => Farm, (farm) => farm.Coops)
    farm: Farm;

    @OneToMany(() => Poultry, (poultry: Poultry) => poultry.Coop)
    poultries: Poultry[];

    @OneToMany(
        () => EggProduction,
        (eggProduction: EggProduction) => eggProduction.Coop,
    )
    eggProductions: EggProduction[];

    @OneToMany(() => Mortality, (mortality: Mortality) => mortality.Coop)
    mortalities: Mortality[];

    @OneToMany(
        () => TreatmentSchedule,
        (treatmentSchedule: TreatmentSchedule) => treatmentSchedule.Coop,
    )
    treatmentSchedules: TreatmentSchedule[];

    @OneToMany(
        () => PoultryBatch,
        (poultryBatch: PoultryBatch) => poultryBatch.Coop,
    )
    poultryBatches: PoultryBatch[];
}
