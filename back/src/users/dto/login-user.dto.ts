import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserDto{
    /**
     * Debe ser un email válido
     * @example 'ejemplo@mail.com'
     */
    @IsEmail()
    @IsNotEmpty()
    email:string;


    /**
     * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)
     * @example 'Ejemplo*1'
     */
    @IsNotEmpty()
    @IsString()
    password: string
}