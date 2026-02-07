// في ملف: src/employee/employee.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Expense } from './Expense';
import { Attendance } from './Attendance';
import { Payroll } from './Payroll';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ name: 'EmployeeID' })
  EmployeeID: number;

  @Column({ name: 'UserID', nullable: true })
  UserID: number | null;

  @Column({ name: 'EmployeeName', length: 100 })
  EmployeeName: string;

  @Column({ name: 'HireDate', type: 'date' })
  HireDate: Date;

  // العلاقات
  @OneToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  User: User;

  @OneToMany(() => Expense, (expense) => expense.Employee)
  Expenses: Expense[];

  @OneToMany(() => Attendance, (attendance) => attendance.Employee)
  Attendance: Attendance[];

  @OneToMany(() => Payroll, (payroll) => payroll.Employee)
  Payrolls: Payroll[];
}
