import { IsNotEmpty, IsNumber, IsDateString, Length, Min, IsString } from 'class-validator';

export class CreateTreatmentScheduleDto {
    @IsNotEmpty({ message: 'معرف الحظيرة مطلوب.' })
    @IsNumber({}, { message: 'معرف الحظيرة يجب أن يكون رقمًا.' })
    @Min(1, { message: 'معرف الحظيرة غير صحيح.' })
    CoopID: number;

    @IsNotEmpty({ message: 'معرف الدواء مطلوب.' })
    @IsNumber({}, { message: 'معرف الدواء يجب أن يكون رقمًا.' })
    @Min(1, { message: 'معرف الدواء غير صحيح.' })
    MedicationID: number;

    @IsNotEmpty({ message: 'تاريخ الجدول الزمني مطلوب.' })
    @IsDateString({}, { message: 'يجب أن يكون تاريخ الجدول الزمني بتنسيق تاريخ صحيح.' })
    ScheduledDate: string;

    @IsNotEmpty({ message: 'حالة الجدول مطلوبة.' })
    @IsString({ message: 'الحالة يجب أن تكون نصًا.' })
    @Length(1, 50, { message: 'يجب أن تكون الحالة بين 1 و 50 حرفًا.' })
    Status: string; // عادةً تبدأ بـ 'Scheduled'
}