import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Shipment } from './entities/shipment.entity';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment) private readonly shipmentService: typeof Shipment
  ){}

  async create(createShipmentDto: CreateShipmentDto) {
    return await this.shipmentService.create({...createShipmentDto});
  }

  async getAll() {
    const shipment = await this.shipmentService.findAll()
    if(!shipment) {
      throw new UnauthorizedException()
    }
    return shipment;
  }

  async getOne(id: string) {
    const shipment = await this.shipmentService.findByPk(id)
    if(!shipment) {
      throw new NotFoundException()
    }
    return shipment;
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto) {
    const shipment = await this.shipmentService.findByPk()
    if(!shipment) {
      throw new NotFoundException()
    }
    return shipment.update(updateShipmentDto);
  }

  async delete(id: string) {
    const shipment = await this.shipmentService.findByPk(id)
    if(!shipment) {
      throw new NotFoundException()
    }
    return shipment.destroy();
  }
}