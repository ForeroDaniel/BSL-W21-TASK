import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto, user: User): Promise<Product> {
    try {
      product.user = user;
      return await this.productRepository.save(product)
    } catch (e) {
      throw new HttpException('User cannot be created', HttpStatus.BAD_GATEWAY)
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (e) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: string): Promise<Product | HttpException> {
    const res = await this.productRepository.findOneBy({id});
    if(!res){
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND)
    }
    return res
  }

  async update(id: string, updateData: UpdateProductDto): Promise<Product | HttpException> {
    const user = await this.productRepository.findOne({where: {id} })

    if(!user){
      throw new HttpException({
        message: 'User cannot be updated',
            why: 'User not found',},
          HttpStatus.BAD_GATEWAY)
    }
    const updateUser = Object.assign(user, updateData)

    return await this.productRepository.save(updateUser)
  }

  async remove(id: string): Promise<Product | HttpException> {
    const deletedProduct = await this.productRepository.findOne({where: {id} })

    if(!deletedProduct){
      throw new HttpException({
            message: 'User cannot be deleted',
            why: 'User not found',},
          HttpStatus.BAD_GATEWAY)
    }

    await this.productRepository.delete(id)
    return deletedProduct
  }
}
