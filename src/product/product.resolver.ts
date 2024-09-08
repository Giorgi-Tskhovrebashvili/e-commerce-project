import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CreateProductInput } from "./dto/create-product.args";
import { ProductPayload } from "./dto/create-product.payload";
import { ProductService } from "./product.service";

@Resolver(() => ProductPayload)
export class ProductResolver {
    constructor(private readonly productService: ProductService){}

    @Query(() => [ProductPayload])
    async getProducts(): Promise<ProductPayload[]>{
        return this.productService.findAll();
    }

    @Mutation(() => ProductPayload)
    async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<ProductPayload>{
        return this.productService.create(createProductInput);
    }
};