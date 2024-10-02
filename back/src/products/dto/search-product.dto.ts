import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
    @ApiProperty({
        description: 'Name of the product to search for',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    productName?: string;

    @ApiProperty({
        description: 'Name of the category to search within',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    categoryName?: string;
}
