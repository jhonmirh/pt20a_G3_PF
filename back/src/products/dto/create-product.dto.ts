import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: "The name of the product",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    type: String,
    description: "The description of the product",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: "The price of the product",
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    description: "The image URL of the product",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;
  @ApiProperty({
    type: String,
    description: "ID de la categoría del producto",
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}