import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../products.entity";

export class ProductResponseDto{
    @ApiProperty({
        type: String,
        description: "The unique identifier of the product, asigned by the database",
        required: true,
    })
    id:string;

    @ApiProperty({
        type: String,
        description: "The name of the product",
        required: true,
    })
    name:string;

    @ApiProperty({
        type: String,
        description: "The description of the product",
        required: true,
    })
    description:string;

    @ApiProperty({
        type: Number,
        description: "The price of the product",
        required: true,
    })
    price:number;

    @ApiProperty({
        type: String,
        description: "The image URL of the product",
        required: false,
    })
    image:string;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
    }
}