import { uuidv4 } from "uuid";
import { Table, Model, Column, DataType } from "sequelize-typescript";


interface OrderCreateAttrs{
    items: {
        productId: uuidv4;
        quantity: number;
        price: number;
      }[];
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
    shippingAddress: string;
}

@Table({tableName:"order"})
export class Order extends Model<Order, OrderCreateAttrs>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: uuidv4,
        allowNull: false
    })
    id : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    customerId: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    totalPrice: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    shippingAddress: string;
}
