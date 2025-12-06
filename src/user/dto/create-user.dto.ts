import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    Username: string;

    @IsString()
    @IsNotEmpty()
    PasswordHash: string;

    @IsString()
    @IsNotEmpty()
    Email: string;

    @IsInt()
    @IsNotEmpty()
    RoleID: number;
}
