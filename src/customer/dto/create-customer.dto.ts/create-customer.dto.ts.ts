import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  CustomerName: string;

  @IsString()
  @IsOptional()
  ContactInfo: string;
}
