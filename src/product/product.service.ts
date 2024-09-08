import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { UserNotFound } from './error/user.error';
import { Product } from './schema/product.schema';
import { ObjectId } from 'src/users/interface/objectId.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly userService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto) { 
    const user = await this.userService.findById(createProductDto.user);
    if (!user) {
      throw UserNotFound;
    }
    const post = await this.productModel.create(createProductDto);

    this.userService.addProduct(user._id as ObjectId, post._id as ObjectId);

    return await post.populate('user');
  }

  findAll() {
    return this.productModel.find();
  }
  
  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
