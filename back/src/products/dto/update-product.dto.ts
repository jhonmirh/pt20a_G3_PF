import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: "The new name of the product",
    required: false,
  })
  @IsOptional() // Indica que este campo es opcional
  @IsString() // Valida que sea un string
  name?: string; // Usa ? para indicar que es opcional

  @ApiProperty({
    type: String,
    description: "The new description of the product",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Number,
    description: "The new price of the product",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    type: String,
    description: "The new image URL of the product",
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;
}