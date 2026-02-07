import { IsNumber, IsNotEmpty, IsDateString, IsOptional, IsString } from 'class-validator';

export class CloseCycleDto {
    @IsNumber()
    @IsNotEmpty()
    slaughterhouseID: number;

    @IsNumber()
    @IsNotEmpty()
    liveWeight: number;

    @IsNumber()
    @IsNotEmpty()
    dressedWeight: number;

    @IsNumber()
    @IsNotEmpty()
    pricePerKg: number;

    @IsNumber()
    @IsOptional()
    transportationCost?: number;

    @IsNumber()
    @IsOptional()
    otherCosts?: number;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsDateString()
    @IsOptional()
    transferDate?: string;

    @IsOptional()
    sendToInventory?: boolean;
}
