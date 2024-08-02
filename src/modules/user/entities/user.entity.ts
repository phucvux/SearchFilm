import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    username: String;

    @Column()
    password: String;

    @Column({unique: true})
    email: String;
}