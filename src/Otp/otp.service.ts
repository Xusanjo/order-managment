import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(@InjectModel(Otp) private readonly otpModel: typeof Otp) {}

  async findOtpByUserIdAndOtp(userId: number, otp: string): Promise<Otp | null> {
    return await this.otpModel.findOne({ where: { userId, otp } });
  }

  async saveOtp(createOtpDto: CreateOtpDto) {
    return await this.otpModel.create({ ...createOtpDto });
  }

  async remove(id: number): Promise<void> {
    const otp = await this.otpModel.findByPk(id);
    if (!otp) {
      throw new NotFoundException('Otp topilmadi');
    }
    return await otp.destroy();
  }

  async verifyOtp(userId: number, otp: string){
    this.logger.log(`Verifying OTP for userId: ${userId}`);
    const savedOtp = await this.findOtpByUserIdAndOtp(userId, otp);
    if(!savedOtp){
      throw new UnauthorizedException('Invalid OTP');
    }
    return this.remove(savedOtp.id);
  }
}