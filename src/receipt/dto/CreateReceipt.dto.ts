import { IsNotEmpty, IsNumber, IsDateString, IsPositive, Min } from 'class-validator';

export class CreateReceiptDto {
    @IsNotEmpty({ message: 'معرف المبيعة مطلوب.' })
    @IsNumber({}, { message: 'معرف المبيعة يجب أن يكون رقمًا.' })
    @Min(1, { message: 'معرف المبيعة غير صحيح.' })
    SaleID: number;

    @IsNotEmpty({ message: 'معرف العميل مطلوب.' })
    @IsNumber({}, { message: 'معرف العميل يجب أن يكون رقمًا.' })
    @Min(1, { message: 'معرف العميل غير صحيح.' })
    CustomerID: number;

    @IsNotEmpty({ message: 'معرف طريقة الدفع مطلوب.' })
    @IsNumber({}, { message: 'معرف طريقة الدفع يجب أن يكون رقمًا.' })
    @Min(1, { message: 'معرف طريقة الدفع غير صحيح.' })
    PaymentMethodID: number;

    @IsNotEmpty({ message: 'تاريخ الإيصال مطلوب.' })
    @IsDateString({}, { message: 'يجب أن يكون تاريخ الإيصال بتنسيق تاريخ صحيح.' })
    ReceiptDate: string;

    @IsNotEmpty({ message: 'المبلغ مطلوب.' })
    @IsNumber({}, { message: 'المبلغ يجب أن يكون رقمًا.' })
    @IsPositive({ message: 'المبلغ يجب أن يكون رقمًا موجبًا.' })
    Amount: number;
}