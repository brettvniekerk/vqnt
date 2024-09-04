import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("temp")
export class Temp {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: UUID;

    @Column({
        name: "field",
        type: "text",
        nullable: true
    })
    @IsString()
    @IsOptional()
    field?: string;

    @Column({
        name: "value",
        type: "numeric",
        nullable: true
    })
    @IsNumber()
    @IsOptional()
    value?: number;

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
