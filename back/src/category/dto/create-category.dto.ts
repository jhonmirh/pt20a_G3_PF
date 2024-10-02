import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        type: String,
        description: "Nombre de la categoría",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}