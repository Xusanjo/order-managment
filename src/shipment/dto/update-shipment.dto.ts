import { PartialType } from '@nestjs/mapped-types';
import { CreateShipmentDto } from './create-shipment.dto';

export class UpdateShipmentDto extends PartialType(CreateShipmentDto) {
    orderId?: string;
    status?: 'pending' | 'in transit' | 'delivered' | 'failed';
    trackingNumber?: string;
    estimatedDelivery?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
