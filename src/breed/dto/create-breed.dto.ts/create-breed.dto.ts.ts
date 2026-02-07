import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  BreedName: string;

  @IsString()
  @IsOptional()
  @IsString()
  @IsOptional()
  Description: string;

  @IsOptional()
  DefaultPrice: number;
}
