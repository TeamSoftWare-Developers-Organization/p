import { IsDateString, IsInt, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateQualityControlDto {
  @IsOptional()
  @IsDateString()
  TestDate?: Date;

  @IsOptional()
  @IsInt()
  ItemID?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ItemType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  Result?: string;

  @IsOptional()
  @IsString()
  Notes?: string;
}
