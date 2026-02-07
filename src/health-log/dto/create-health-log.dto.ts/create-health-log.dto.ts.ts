import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateHealthLogDto {
  @IsNumber()
  @IsNotEmpty()
  PoultryID: number;

  @IsDateString()
  @IsNotEmpty()
  LogDate: string;

  @IsString()
  @IsNotEmpty()
  Condition: string;

  @IsString()
  @IsOptional()
  Notes?: string;

  @IsString()
  @IsOptional()
  Treatment?: string;
}

