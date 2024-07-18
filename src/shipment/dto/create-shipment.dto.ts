import {v4 as uuidv4} from "uuid";
export class CreateShipmentDto {
    id: uuidv4;
    orderId: string;
    status: 'pending' | 'in transit' | 'delivered' | 'failed';
    trackingNumber: string;
    estimatedDelivery: Date;
    createdAt: Date;
    updatedAt: Date;
}