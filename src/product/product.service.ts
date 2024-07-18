import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productService: typeof Product
    ){}

  async create(createdProductDto: CreateProductDto){
    return await this.productService.create({...createdProductDto})
  }

  async findAll() {
    const product = await this.productService.findAll()
    if(!product){
      throw new NotFoundException()
    }
    return product;
  }

  async findOne(id: string) {
    const product = await this.productService.findByPk(id)
    if(!product){
      throw new NotFoundException()
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productService.findByPk(id);
    if(!product){
      throw new NotFoundException()
    }
    return product.update(updateProductDto);
  }

  async remove(id: string) {
    const product = await this.productService.findByPk(id)
    if(!product) {
      throw new NotFoundException()
    }
    return product.destroy()
  }
}
