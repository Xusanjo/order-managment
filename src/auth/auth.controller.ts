import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { SignUpDto } from 'src/user/dto/signUp.dto';
import { CreateOtpDto } from 'src/Otp/dto/create-otp.dto';
import { RefreshToken } from 'src/token/entities/token.entity';
import { UserJwtGurad } from 'src/user/guards/jwt-user.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: SignUpDto) {
    return this.authService.signup(createAuthDto);
  }

  @Get(':id')
  getme(@Param('id') id: string) {
    return this.authService.me(id);
  }

  @Delete("id")
  @UseGuards(UserJwtGurad)
  async delete(@Param('id') id: string) {
    await this.authService.logout(id);
    return {message: 'Successfully logged out'};
  }

  @Put(':id')
  async refreshtoken(@Body() id: string) {
    return this.authService.refreshToken( id);
  }
}
