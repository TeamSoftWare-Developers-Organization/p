import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    RoleName: string;

    @IsString()
    @IsNotEmpty()
    Permissions: string;
}
