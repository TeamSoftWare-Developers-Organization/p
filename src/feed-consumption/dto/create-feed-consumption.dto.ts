import { IsDateString, IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

/**
 * كائن نقل البيانات (DTO) لإنشاء سجل استهلاك علف جديد.
 * يتحقق من صحة المدخلات قبل معالجة الأمر.
 */
export class CreateFeedConsumptionDto {
  /**
   * تاريخ تسجيل الاستهلاك. يجب أن يكون تاريخًا صحيحًا.
   */
  @IsDateString()
  @IsNotEmpty()
  ConsumptionDate: string;

  /**
   * كمية العلف المستهلكة (بالكيلوغرام أو الوحدة المعتمدة).
   */
  @IsNumber()
  @IsNotEmpty()
  Quantity: number;

  /**
   * معرف العلف المستخدم (يرتبط بكيان Feed).
   */
  @IsNumber()
  @IsNotEmpty()
  FeedID: number;

  /**
   * معرف الحظيرة التي حدث فيها الاستهلاك (يرتبط بكيان Coop).
   */
  @IsNumber()
  @IsOptional()
  ShedID?: number;

  /**
   * ملاحظات إضافية حول الاستهلاك.
   */
  @IsString()
  @IsOptional()
  Notes?: string;
}

