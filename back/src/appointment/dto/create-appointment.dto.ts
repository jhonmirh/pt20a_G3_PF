// import { IsNotEmpty, IsString, IsUUID, IsDateString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateAppointmentDto {
//   @ApiProperty({
//     description: 'Appointment date and time in ISO format',
//     example: '2024-10-10T14:00:00Z'
//   })
//   @IsDateString() // Valida que sea un string en formato ISO 8601 (fecha y hora)
//   @IsNotEmpty()
//   date: string; // Cambio de 'date' a 'date' para reflejar fecha y hora en un solo campo

//   @ApiProperty({
//     description: 'Description of the appointment',
//     example: 'Medical consultation'
//   })
//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty({
//     description: 'ID of the user associated with the appointment',
//     example: '123e4567-e89b-12d3-a456-426614174000'
//   })
//   @IsUUID()
//   @IsNotEmpty()
//   user: string; // Manteniendo el userId para identificar al usuario asociado con el turno
// }
