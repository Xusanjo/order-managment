import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from 'src/Otp/otp.service';
import { OtpModule } from 'src/Otp/otp.module';
// import { EmailService } from 'src/mailer/mail.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY || "sECREt",
      signOptions: {
        expiresIn: "5m",
      },
    }),
    // OtpModule,
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    // OtpService, 
    // EmailService
  ],
  exports : [UserService]
})
export class UserModule {}
