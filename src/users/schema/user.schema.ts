import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  userName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);