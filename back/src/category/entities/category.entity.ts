import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "src/products/products.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "categories"
})
export class Category {
    @ApiProperty({
        type: String,
        description: "Identificador único de la categoría",
        required: true,
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        type: String,
        description: "Nombre de la categoría",
        required: true,
    })
    @Column({ length: 100, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}