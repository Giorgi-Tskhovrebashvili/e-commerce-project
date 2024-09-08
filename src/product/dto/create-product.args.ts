import { InputType, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "src/users/interface/objectId.interface";

@InputType()
export class CreateProductInput {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  productName: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => ID)
  user: ObjectId;
}