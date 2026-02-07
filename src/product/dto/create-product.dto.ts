import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto {
    @IsString()
    ProductName: string;

    @IsString()
    @IsOptional()
    Description?: string;

    @IsNumber()
    UnitPrice: number;

    @IsNumber()
    StockQuantity: number;

    @IsBoolean()
    @IsOptional()
    IsActive?: boolean;
}
