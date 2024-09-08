import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
