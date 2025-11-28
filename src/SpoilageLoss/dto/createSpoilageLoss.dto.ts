import { IsNotEmpty, IsNumber, IsString, IsDateString, Length, Min } from 'class-validator';

export class CreateSpoilageLossDto {
    @IsNotEmpty({ message: 'تاريخ الخسارة مطلوب.' })
    @IsDateString({}, { message: 'يجب أن يكون تاريخ الخسارة بتنسيق تاريخ صحيح.' })
    LossDate: string;

    @IsNotEmpty({ message: 'معرف العنصر الذي حدثت فيه الخسارة مطلوب.' })
    @IsNumber({}, { message: 'معرف العنصر يجب أن يكون رقمًا.' })
    @Min(1, { message: 'معرف العنصر غير صحيح.' })
    ItemID: number;

    @IsNotEmpty({ message: 'نوع العنصر مطلوب.' })
    @IsString({ message: 'نوع العنصر يجب أن يكون نصًا.' })
    @Length(1, 50, { message: 'يجب أن يكون نوع العنصر بين 1 و 50 حرفًا.' })
    ItemType: string;

    @IsNotEmpty({ message: 'كمية الخسارة مطلوبة.' })
    @IsNumber({}, { message: 'كمية الخسارة يجب أن تكون رقمًا.' })
    @Min(1, { message: 'كمية الخسارة يجب أن تكون رقمًا موجبًا أكبر من الصفر.' })
    QuantityLost: number;
}