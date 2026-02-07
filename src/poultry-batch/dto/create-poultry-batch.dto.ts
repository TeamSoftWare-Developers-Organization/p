import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreatePoultryBatchDto {
  @IsString()
  @IsNotEmpty()
  BatchName: string;

  @IsInt()
  @IsOptional()
  CoopID?: number;

  @IsInt()
  @IsOptional()
  SlaughterhouseID?: number;

  @IsInt()
  @IsOptional()
  BreedID?: number;

  @IsInt()
  @IsOptional()
  ChickCount?: number;

  @IsOptional()
  ArrivalDate?: Date;

  @IsString()
  @IsOptional()
  Description?: string;
}