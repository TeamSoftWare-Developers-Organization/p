import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateQualityControlDto {
  @IsNotEmpty()
  @IsDateString()
  TestDate: Date;

  @IsNotEmpty()
  @IsNumber()
  ItemID: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  ItemType: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  Result: string;

  @IsOptional()
  @IsString()
  Notes?: string;
}