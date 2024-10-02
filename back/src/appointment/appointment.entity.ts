// import { Product } from "src/products/products.entity";
// import { User } from "src/users/users.entity";
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";



// export enum Statusenum {
//   PENDIENTE = 'pending',
//   COMPLETADO = 'completed',
// }

// @Entity({ name: "appointments" })
// export class Appointment {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({
//     type: "enum",
//     enum: Statusenum,
//     default: Statusenum.PENDIENTE,
//   })
//   status: Statusenum;

//   @Column("timestamp")
//   date: Date;

//   @Column()
//   description: string;

//   // // Relación con User
//   // @ManyToOne(() => User, (user) => user.appointments, { eager: true })
//   // user: User;

//   // Relación con product (servicio solicitado)
//   //*Product no es array [] porque queremos que por cada appointment haya un solo servicio/producto
//   @OneToOne(() => Product, product => product.appointment)
//     @JoinColumn({ name: "productId" })
//     product: Product;
// }
