import {IsUUID, IsString, IsNotEmpty, IsEmail, IsDate} from "class-validator";
export class CreateCustomerDto {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date
}
