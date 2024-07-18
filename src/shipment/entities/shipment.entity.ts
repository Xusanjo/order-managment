import {v4 as uuidv4} from "uuid";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ShipmentCreateAttrs {
    orderId:string;
    status: 'pending' | 'in transit' | 'delivered' | 'failed';
}

@Table({tableName: "shipment"})
export class Shipment extends Model<Shipment, ShipmentCreateAttrs> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: uuidv4,
        primaryKey:true
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    orderId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: 'pending' | 'in transit' | 'delivered' | 'failed';

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    trackingNumber: string;

    @Column({
        type: DataType.DATE,
        allowNull:false,
    })
    estimatedDelivery: Date;
}
