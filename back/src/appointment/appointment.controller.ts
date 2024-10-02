// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { AppointmentService } from './appointment.service';
// import { CreateAppointmentDto } from './dto/create-appointment.dto';
// import { UpdateAppointmentDto } from './dto/update-appointment.dto';
// import { AppointmentResponseDto } from './dto/response-appointment.dto';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// @ApiTags("appointments")
// @Controller('appointments')
// export class AppointmentController {
//   constructor(
//     private readonly appointmentService: AppointmentService,
//   ) {}

//   @Post()
//   @ApiOperation({ summary: 'Crear una nueva cita' })
//   @ApiResponse({ status: 201, description: 'Cita creada exitosamente', type: AppointmentResponseDto })
//   async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
//     const appointment = await this.appointmentService.createAppointment(createAppointmentDto);
//     return new AppointmentResponseDto(appointment);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Obtener todas las citas' })
//   @ApiResponse({ status: 200, description: 'Citas encontradas', type: [AppointmentResponseDto] })
//   async findAll(): Promise<AppointmentResponseDto[]> {
//     const appointments = await this.appointmentService.findAll();
//     return appointments.map((appointment) => new AppointmentResponseDto(appointment));
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Obtener una cita por ID' })
//   @ApiResponse({ status: 200, description: 'Cita encontrada', type: AppointmentResponseDto })
//   @ApiResponse({ status: 404, description: 'Cita no encontrada' })
//   async findOne(@Param('id') id: string): Promise<AppointmentResponseDto> {
//     const appointment = await this.appointmentService.findOne(id);
//     return new AppointmentResponseDto(appointment);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Actualizar una cita por ID' })
//   @ApiResponse({ status: 200, description: 'Cita actualizada', type: AppointmentResponseDto })
//   @ApiResponse({ status: 404, description: 'Cita no encontrada' })
//   async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentResponseDto> {
//     const updatedAppointment = await this.appointmentService.updateAppointment(id, updateAppointmentDto);
//     return new AppointmentResponseDto(updatedAppointment);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Eliminar una cita por ID' })
//   @ApiResponse({ status: 204, description: 'Cita eliminada exitosamente' })
//   @ApiResponse({ status: 404, description: 'Cita no encontrada' })
//   async remove(@Param('id') id: string): Promise<void> {
//     return this.appointmentService.removeAppointment(id);
//   }
// }
