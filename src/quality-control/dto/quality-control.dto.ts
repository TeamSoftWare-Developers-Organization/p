import { IsDateString, IsInt, IsString, MaxLength, IsOptional } from 'class-validator';

export class QualityControlDto {
  @IsInt()
  QualityControlID: number;

  @IsDateString()
  TestDate: Date;

  @IsInt()
  ItemID: number;

  @IsString()
  @MaxLength(50)
  ItemType: string;

  @IsString()
  @MaxLength(255)
  Result: string;

  @IsOptional()
  @IsString()
  Notes?: string;
}
