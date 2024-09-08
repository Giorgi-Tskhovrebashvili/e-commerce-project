import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsMongoId } from "class-validator";
import { ObjectId } from "src/users/interface/objectId.interface";

export class CreateProductDto {
  @ApiProperty({ example: 'Macbook' })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({ example: 'Compiuter' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 1300 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'user_id' })
  @IsMongoId()
  user: ObjectId;
}
