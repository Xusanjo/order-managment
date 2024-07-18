import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from 'src/token/token.module';
import { OtpModule } from 'src/otp/otp.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[UserModule,
    RefreshTokenModule,
    // OtpModule,
    JwtModule.register({
      global:true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
