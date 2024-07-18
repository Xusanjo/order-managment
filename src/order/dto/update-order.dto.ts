import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { UUID } from 'crypto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    items?: {
        productId: UUID;
        quantity: number;
        price: number;
      }[];
    status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
    shippingAddress?: string;
}
