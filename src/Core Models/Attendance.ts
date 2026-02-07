// في ملف: src/attendance/attendance.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './Employee ';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn({ name: 'AttendanceID' })
  AttendanceID: number;

  @Column({ name: 'EmployeeID' })
  EmployeeID: number;

  @Column({ name: 'AttendanceDate', type: 'date' })
  AttendanceDate: Date;

  @Column({ name: 'TimeIn', type: 'timestamp', nullable: true })
  TimeIn: Date | null;

  @Column({ name: 'TimeOut', type: 'timestamp', nullable: true })
  TimeOut: Date | null;

  @Column({ name: 'Status', length: 50, nullable: true })
  Status: string;

  @ManyToOne(() => Employee, (employee) => employee.Attendance)
  @JoinColumn({ name: 'EmployeeID' })
  Employee: Employee;
}
