// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Appointment } from './appointment.entity';
// import { CreateAppointmentDto } from './dto/create-appointment.dto';
// import { UpdateAppointmentDto } from './dto/update-appointment.dto';
// import { User } from 'src/users/users.entity';


// @Injectable()
// export class AppointmentService {
//   constructor(
//     @InjectRepository(Appointment)
//     private readonly appointmentRepository: Repository<Appointment>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
  
//   ) {}

//   // Crear una cita
//   async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
//     const { user } = createAppointmentDto;

//     // Verificar si el usuario existe
//     const userExist = await this.userRepository.findOne({ where: { id: user } });
//     if (!userExist) {
//         throw new NotFoundException(`User with ID ${user} not found`);
//     }

//     // Asegúrate de pasar el objeto user completo
//     const appointment = this.appointmentRepository.create({ ...createAppointmentDto, user: userExist });
//     return await this.appointmentRepository.save(appointment);
// }


//   // Obtener todas las citas
//   async findAll(): Promise<Appointment[]> {
//     return await this.appointmentRepository.find({ relations: ['user'] });
//   }

//   // Obtener una cita por su ID
//   async findOne(id: string): Promise<Appointment> {
//     const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['user'] });
//     if (!appointment) {
//       throw new NotFoundException(`Appointment with ID ${id} not found`);
//     }
//     return appointment;
//   }

//   // Actualizar una cita
//   async updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
//     const appointment = await this.findOne(id);
//     Object.assign(appointment, updateAppointmentDto);
//     return await this.appointmentRepository.save(appointment);
//   }

//   // Eliminar una cita
//   async removeAppointment(id: string): Promise<void> {
//     const appointment = await this.findOne(id);
//     await this.appointmentRepository.remove(appointment);
//   }

  
// }