import { v4 as uuidv4 } from 'uuid';
import {IsString, IsNotEmpty, IsNumber, IsArray, IsDate, IsUUID} from "class-validator";

export class CreateOrderItemDto{
    @IsUUID()
    productId: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CreateOrderDto {
    // id: uuidv4;
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;

    @IsArray()
    @IsNotEmpty()
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';

    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}