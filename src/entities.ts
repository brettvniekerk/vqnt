import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export class RootEntity {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: UUID;

    @Column({
        name: "createdAt",
        type: "timestamptz"
    })
    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @Column({
        name: "updatedAt",
        type: "timestamptz",
        nullable: true
    })
    @UpdateDateColumn()
    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}

@Entity("users")
export class User extends RootEntity {
    @Column({
        name: "email",
        type: "text"
    })
    @IsEmail()
    @IsString()
    email: string;

    @Column({
        name: "password",
        type: "text"
    })
    @IsString()
    password: string;
}
