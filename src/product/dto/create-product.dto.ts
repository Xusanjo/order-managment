import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty,IsUUID, IsEnum, IsUrl, IsDate, IsNumber} from "class-validator";
export class CreateProductDto {
    @IsUUID()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    stock: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsEnum(['available', 'out of stock', 'discontinued'])
    @IsString()
    @IsNotEmpty()
    status: string

    @IsUrl()
    @IsString()
    @IsNotEmpty()
    imageUrls: string

    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date
}
