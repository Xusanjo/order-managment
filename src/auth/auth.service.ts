import { Injectable } from '@nestjs/common';
import { UpdatedDto } from 'src/user/dto/updatedUser.dto';
import { CreatedDto } from 'src/user/dto/createdUser.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../token/token.service';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';
// import { OtpService } from 'src/Otp/otp.service';
import { CreateLoginDto } from "../user/dto/login-user.dto"


@Injectable()
export class AuthService {
  constructor(
    // private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshService: RefreshTokenService
  ) { }

  async signup(createRegisterDto: CreatedDto) {
    return await this.userService.create(createRegisterDto);
  }

  async signIn(createdLoginDto: CreateLoginDto): Promise<{accessToken: string, refreshToken: string}>{
    const user = await this.userService.signIn(createdLoginDto);
    const accessTokenSekret = process.env.JWT_ACCESS_KEY;
    const refreshTokenSekret = process.env.JWT_REFRESH_KEY;

    if(!accessTokenSekret || !refreshTokenSekret){
      throw new Error('JWT secret not configured');
    }

    const payload = {sub: user.id, email: user.email, role: user.role};
    const accessToken = this.jwtService.sign(payload, {secret: accessTokenSekret, expiresIn: '5m'});
    const refreshToken = this.jwtService.sign(payload, { secret: refreshTokenSekret, expiresIn: '7d' });
    
    await this.refreshService.storeRefreshToken({token: refreshToken, userId: user.id, expiryDate: new Date(Date.now()+7*24*60*60*1000)});

    return {
      accessToken,
      refreshToken
    }
  
  }


  async me(id: string) {
    return await this.userService.getOne(id);
  }

  async logout(id: string) {
    await this.refreshService.removeTokensForUser(+id);
  }

  async refreshToken(id: string) {
    await this.refreshService.refreshToken(id);
  }
}