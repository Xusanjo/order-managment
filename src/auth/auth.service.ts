import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { SignUpDto } from 'src/user/dto/signUp.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../token/token.service';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshService: RefreshTokenService
  ) { }

  async signup(createRegisterDto: SignUpDto) {
    return await this.userService.create(createRegisterDto);
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