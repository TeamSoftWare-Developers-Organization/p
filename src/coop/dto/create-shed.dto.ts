import { IsNumber, IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateShedDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    type?: string; // نوع الدواجن

    @IsNumber()
    @IsNotEmpty()
    capacity: number;

    @IsNumber()
    @IsOptional()
    currentBirds?: number;

    @IsNumber()
    @IsOptional()
    temperature?: number;

    @IsNumber()
    @IsOptional()
    humidity?: number;

    @IsEnum(['active', 'maintenance', 'inactive'])
    @IsOptional()
    status?: 'active' | 'maintenance' | 'inactive';

    @IsDateString()
    @IsOptional()
    lastCleaned?: string;

    @IsNumber()
    @IsNotEmpty()
    farmId: number;
}
