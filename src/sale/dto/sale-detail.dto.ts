import { IsNumber, IsNotEmpty } from 'class-validator';

export class SaleDetailDto {
  @IsNumber()
  @IsNotEmpty()
  itemID: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNotEmpty()
  itemType: string; // 'Poultry' | 'Egg'
}
