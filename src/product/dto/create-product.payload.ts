import { ObjectType, Field } from "@nestjs/graphql";
import { ObjectId } from "src/users/interface/objectId.interface";

@ObjectType()
export class ProductPayload {
  @Field()
  productName: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  price: number;

  user: ObjectId;
}