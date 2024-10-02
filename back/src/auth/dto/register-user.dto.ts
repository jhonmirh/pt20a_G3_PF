import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class RegisterUserDto {
    

    /**
     * Nombre del usuario
     * @example 'Juan'
     */
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    @MinLength(3)
    name: string;


    /**
     * Debe ser un email válido
     * @example 'ejemplo@mail.com'
     */
    @IsEmail()
    email: string;

    /**
     * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)
     * @example 'Ejemplo*1'
     */
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
        {
            message:
            "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)"
        }
    )
    @IsString()
    password: string;


    /**
     * El teléfono del usuario
     * @example '15510256'
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;


    /**
     * La ciudad donde vive el usuario
     * @example 'López'
     */
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    @IsOptional()
    city?: string;


    /**
     * La dirección donde vive el usuario
     * @example 'Rivadavia 1500'
     */
    @MaxLength(80)
    @MinLength(3)
    @IsString()
    @IsOptional()
    address?: string;

    constructor(partial: Partial<RegisterUserDto>) {
        Object.assign(this, partial);
    }

}
