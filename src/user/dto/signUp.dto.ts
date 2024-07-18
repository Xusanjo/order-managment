
import {IsString, IsNotEmpty, IsEmail, Length, IsUUID, IsEnum} from "class-validator";
export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @Length(4,10)
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    @Length(4, 10)
    confirmPassword: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(['customer', 'admin', 'manager', 'user'])
    role: string 
    
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    address: string
}
