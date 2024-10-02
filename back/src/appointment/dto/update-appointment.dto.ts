// import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { Statusenum } from '../appointment.entity';

// export class UpdateAppointmentDto {
//   @ApiPropertyOptional({ 
//     description: 'Appointment date and time in ISO format', 
//     example: '2024-10-11T15:00:00Z' 
//   })
//   @IsDateString() // Valida que sea un string en formato ISO 8601 (fecha y hora)
//   @IsOptional()
//   date?: string; // Cambio de 'date' y 'time' a 'date'

//   @ApiPropertyOptional({ description: 'Description of the appointment', example: 'Follow-up consultation' })
//   @IsString()
//   @IsOptional()
//   description?: string;

//   @ApiPropertyOptional({ description: 'Status of the appointment', enum: Statusenum })
//   @IsEnum(Statusenum)
//   @IsOptional()
//   status?: Statusenum;
// }
