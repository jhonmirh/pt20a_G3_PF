import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UserWithAdminDto {

    /**
     * Nombre del usuario
     * @example 'Juan'
     */
    @IsString()
    name: string;

    /**
     * Debe ser un email válido
     * @example 'ejemplo@mail.com'
     */
    @IsString()
    email: string;

    /**
     * El teléfono del usuario
     * @example '15510256'
     */
    @IsNumber()
    phone: number;


    /**
     * La ciudad donde vive el usuario
     * @example 'López'
     */
    @IsString()
    city: string;
    

    
    /**
     * La dirección donde vive el usuario
     * @example 'Rivadavia 1500'
     */
    @IsString()
    address: string;
    
    @IsBoolean()
    admin: boolean;
}