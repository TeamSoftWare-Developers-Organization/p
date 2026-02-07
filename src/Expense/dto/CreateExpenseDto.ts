import {
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  EmployeeID: number;

  @IsDateString()
  @IsNotEmpty()
  ExpenseDate: string;

  @IsNumber()
  @IsNotEmpty()
  Amount: number;

  @IsString()
  @IsNotEmpty()
  Description: string;
}

