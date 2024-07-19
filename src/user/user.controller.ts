import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreatedDto } from './dto/createdUser.dto';
import { UpdatedDto } from './dto/updatedUser.dto';
import { UserJwtGurad } from './guards/jwt-user.guard';
import { UserSelfGuard } from './guards/user-self.guard';
import { CreateOtpDto } from '../Otp/dto/create-otp.dto';
import { CreateLoginDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createDto: CreatedDto) {
    return this.userService.create(createDto);
  }

  @UseGuards(UserJwtGurad)
  @UseGuards(UserSelfGuard)
  @Get('SignIn/:id')
  SignIn(@Body() create: CreateLoginDto) {
    return this.userService.signIn(create);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedDto: UpdatedDto) {
    return this.userService.update(id, updatedDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
