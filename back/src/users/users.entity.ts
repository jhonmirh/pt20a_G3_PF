// import { IsBoolean } from "class-validator";
// import { Appointment } from "src/appointment/appointment.entity";
// import { Entity, Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { v4 as uuid} from 'uuid'

// @Entity({
//     name: 'users'
// })
// export class User {

//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({length: 50, nullable: false})
//     name: string;

//     @Column({ length: 50, unique: true, nullable: false })
//     email: string;

//     @Column({nullable: true})
//     age: number;

//     @Column({ nullable: false })
//     password: string;


//     @Column({ type: 'bigint', nullable: true })
//     phone: number;

//     @Column({ nullable: true })
//     address: string;

//     @Column({ length: 50, nullable: true })
//     city: string;

//     @Column({default: false})
//     admin: boolean


//     @OneToMany(() => Appointment, appointment => appointment.user)
//     appointments: Appointment[];

// }
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["email"]) // Agrega esta línea para establecer la unicidad en el campo email
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true }) // Asegúrate de que el campo email sea único
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    age: number;
    @Column()
    phone: number;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    token: string;

    @Column({ default: false })
    admin: boolean;
}
