import { Column, DataType, Table, Model} from "sequelize-typescript";

interface ProductCreateAttrs {
    productId: string;
    name:string;
}
@Table({tableName: "product"})
export class Product extends Model<Product, ProductCreateAttrs>{
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        primaryKey:true
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    stock: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imageUrls: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    createdAt: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    updatedAt: Date;

}
