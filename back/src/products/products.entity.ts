// import { Appointment } from "src/appointment/appointment.entity";
import { Category } from "src/category/entities/category.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity({
    name: "products"
})
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({
        type: 'varchar',
        nullable: true,
        default: 'https://example.com/default-image.jpg'
    })
    image: string;

    @Column({ type: 'uuid', name: "categoryId", nullable: false })
    categoryId: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    //*un appointment por product
    // @OneToOne(() => Appointment, appointment => appointment.product)
    // appointment: Appointment;
}
