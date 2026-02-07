import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('system_settings')
export class SystemSetting {
    @PrimaryGeneratedColumn()
    SettingID: number;

    @Column({ unique: true })
    Key: string;

    @Column()
    Value: string;

    @Column({ nullable: true })
    Description: string;
}
