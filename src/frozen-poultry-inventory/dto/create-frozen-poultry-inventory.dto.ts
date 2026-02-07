import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateFrozenPoultryInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  PoultryTypeID: number;

  @IsNotEmpty()
  @IsNumber()
  Quantity: number;

  @IsNotEmpty()
  @IsNumber()
  Weight: number;

  @IsNotEmpty()
  @IsDateString()
  FreezeDate: Date;

  @IsOptional()
  @IsNumber()
  SlaughterhouseID?: number;
}
