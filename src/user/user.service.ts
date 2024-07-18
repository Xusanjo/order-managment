import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from './entities/user.entity';
// import { EmailService } from 'src/mailer/mail.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcryptjs";
import { OtpService } from 'src/Otp/otp.service';
import { CreateLoginDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    // private readonly mailerService: EmailService,
    private readonly jwtService: JwtService,
    // private readonly otpService: OtpService,
  ){}

  async create(signUpDto: SignUpDto) {
    const { password, email, ...rest } = signUpDto;
    
    try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // const otp = Math.floor(Math.random() * 1000000) + '';
    const user = new this.userRepository({
      ...rest,
      email,
      password: hashedPassword,
    });

      const savedUser = await user.save();
      // await this.otpService.saveOtp({ userId: savedUser.id, otp});
      return savedUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register user');
    }
  }

  async signIn(createLoginDto: CreateLoginDto) {
    const {email, password} = createLoginDto;
    const user = await this.userRepository.findOne({where: {email} });
    if(!user || !(await bcrypt.compare(password, user.password))){
      throw new UnauthorizedException();
    }
    return user;
  }

  async getAll() {
    const user = await this.userRepository.findAll();
    if(!user) {
      throw new NotFoundException(`Userlar topilmadi`)
    }
    return user;
  }

  async getOne(id: string) {
    const user = await this.userRepository.findByPk(id);
    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user;
  }

  async update(id: string, signInDto: SignInDto) {
    const hashPassword = await bcrypt.hash(signInDto.password, 7);
    const updatedData = { email: signInDto.email, password: hashPassword }
    const updateduser = await this.userRepository.update(
      updatedData,
      {where: {id}, returning: true},
      );
    return updateduser;
  }

  async delete(id: string) {
    return this.userRepository.destroy({where: {id}});
  }

}