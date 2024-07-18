import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Model } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private readonly customerService: typeof Customer
  ){ }

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create({...createCustomerDto})
  }

  async findAll() {
    const customer = await this.customerService.findAll()
    if(!customer){
      throw new NotFoundException();
    }
    return customer;
  }

  async findOne(id: string) {
    const customer = await this.customerService.findByPk(id)
    if(!customer){
      throw new NotFoundException();
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer =  await this.customerService.update(updateCustomerDto, {where : {id : id}})
    if(!customer){
      throw new NotFoundException();
    }
    return customer
  }

  async remove(id: string) {
    const customer = await this.customerService.findByPk(id)
    if(!customer){
      throw new NotFoundException();
    }
    return customer.destroy();
  }
}
