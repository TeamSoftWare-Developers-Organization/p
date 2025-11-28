import { Medication } from 'src/Core Models/Medication';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('vaccination_schedule')
export class VaccinationSchedule {
  @PrimaryGeneratedColumn()
  ScheduleID: number; // المعرف الرئيسي لجدول التطعيم

  @Column()
  MedicationID: number; // معرف اللقاح المخصص (Medication is used as Vaccine)

  @Column({ type: 'date' })
  ScheduledDate: Date; // التاريخ المحدد للتطعيم

  @Column({ length: 50 })
  Status: string; // حالة التطعيم (مثل: Scheduled, Administered, Postponed)

  // العلاقة (ManyToOne)
  @ManyToOne(() => Medication, (medication) => medication.VaccinationSchedules)
  Medication: Medication;
}