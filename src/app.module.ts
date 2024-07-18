import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ShipmentModule } from './shipment/shipment.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from "@nestjs/sequelize"
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './Otp/otp.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host:'localhost', //process.env.DB_HOST,
      port: 5432,//Number(process.env.DB_PORT),
      username: 'postgres', //process.env.DB_USER,
      password: 'Husan1214', //`${process.env.DB_PASSWORD}`,
      database: 'ordermanagment',
      autoLoadModels: true,
      synchronize:true,
    }),
     CustomerModule,UserModule,ShipmentModule ,AuthModule,OtpModule// bu ham qushiladi OtpModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

