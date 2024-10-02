import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Min, Max } from "class-validator";
import { Type } from "class-transformer";
export class CreateUserDto {


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
         * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)
         * @example 'Ejemplo*1'
         */
        @IsNotEmpty()
        @IsString()
        passwordConfirm?: string;

    /**
     * La edad del usuario
     * @example '25'
     */

    @Type(() => Number) 
    @IsNumber()
    @Min(18) 
    @Max(120) 
    @IsOptional()
    age: number;


    /**
     * El teléfono del usuario
     * @example '15510256'
     */
    @Type(() => Number) // Convierte el valor a número
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

}
