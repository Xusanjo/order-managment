import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderService {
  constructor (@InjectModel(Order) private readonly orderService: typeof Order){}
  
  async createOrder(createOrderDto: CreateOrderDto) {
    return await this.orderService.create({...createOrderDto});
  }
  
  async getAllOrders() {
    const order = await this.orderService.findAll()
    if(!order) {
      throw new UnauthorizedException()
    }
    return order;
  }

  async getOrderById(id: string) {
    const order = await this.orderService.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.findByPk(id); 
    if(!order){
      throw new NotFoundException()
    }
    return order.update(updateOrderDto);
  }

  async deleteOrder(id: string) {
    const order = await this.orderService.findByPk(id)
    if(!order) {
      throw new NotFoundException();
    }
    return order.destroy()
  }
}
