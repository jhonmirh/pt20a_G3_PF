// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Appointment } from './appointment.entity';
// // import { AppointmentService } from './appointment.service';
// import { AppointmentController } from './appointment.controller';
// import { User } from 'src/users/users.entity'; // Importar si lo necesitas en el servicio
// import { Product } from 'src/products/products.entity';
// import { ProductsModule } from 'src/products/products.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Appointment, User, Product]),
//     ProductsModule, // Asegúrate de importar este módulo
//   ],
//   // providers: [AppointmentService],
//   controllers: [AppointmentController],
//   // exports: [AppointmentService],
// })
// export class AppointmentModule {}