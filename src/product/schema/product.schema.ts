import { Field, ID } from "@nestjs/graphql";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ObjectId } from "src/users/interface/objectId.interface";
import { User } from "src/users/schema/user.schema";

export class Product extends Document {
    @Field(() => ID)
    _id: ObjectId;
  
    @Field(() => String)
    @Prop({ required: true })
    productName: string;
  
    @Field(() => String)
    @Prop({ required: true })
    description: string;
  
    @Field(() => Number)
    @Prop({ required: true })
    price: number;
      
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: ObjectId;
  }
  
  export const ProductSchema = SchemaFactory.createForClass(Product);
