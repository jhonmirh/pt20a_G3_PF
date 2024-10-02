import { IsNumber, IsString } from "class-validator";

export default class UserResponseDto {

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    phone: number;

    @IsString()
    city?: string;

    @IsString()
    address: string;


    constructor(partial: Partial<UserResponseDto>){ //significa que puede venir otras propiedades o menos de las que declaro, por ejemplo password
        const {name, email, address, phone, city} = partial;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.city = city;
    }
}


