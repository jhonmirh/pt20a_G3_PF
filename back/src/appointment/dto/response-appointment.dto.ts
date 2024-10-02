// import { ApiProperty } from '@nestjs/swagger';
// import { Statusenum } from '../appointment.entity';
// import { Appointment } from '../appointment.entity';
// import { User } from 'src/users/users.entity';

// export class AppointmentResponseDto {
//   @ApiProperty({ description: 'Unique identifier for the appointment', example: '123e4567-e89b-12d3-a456-426614174000' })
//   id: string;

//   @ApiProperty({ description: 'Date and time of the appointment in ISO format', example: '2024-10-10T14:00:00Z' })
//   date: Date;

//   @ApiProperty({ description: 'Description of the appointment', example: 'Medical consultation' })
//   description: string;

//   @ApiProperty({ description: 'User associated with the appointment' })
//   user: User; // Cambié user por un objeto de tipo User

//   @ApiProperty({ description: 'Status of the appointment', enum: Statusenum })
//   status: Statusenum;

//   constructor(appointment: Appointment) {
//     this.id = appointment.id;
//     this.date = appointment.date;
//     this.description = appointment.description;
//     // this.user = appointment.user; // Asignamos el objeto user en vez del user
//     this.status = appointment.status;
//   }
// }
