import {Table, Model, Column, DataType} from "sequelize-typescript"

interface UserCreateAttrs {
    email: string;
    password: string
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreateAttrs> {

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    confirmPassword: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phoneNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;
}
