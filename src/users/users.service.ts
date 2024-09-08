import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from './interface/objectId.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAlreadyExists } from './error/user.error';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw UserAlreadyExists;
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }
  findById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  findAll() {
    return this.userModel.find().populate('posts');
  }

  findOne(email: string) {
    return this.userModel.findOne({ email }).select(['email', 'password']);
  }

  async addProduct(userId: ObjectId, productId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.products.push(productId);
    await user.save();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
