import {
    IsDate,
    IsEmail,
    IsOptional,
    IsString,
    IsUUID,
    Matches
} from "class-validator";
import { UUID } from "crypto";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn
} from "typeorm";
import { ALPHANUMERIC, NAMES } from "./regex";

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

    @OneToOne(() => Profile, profile => profile.user)
    profile: Relation<Profile>;
}

@Entity("profiles")
export class Profile extends RootEntity {
    @Column({
        name: "userId",
        type: "uuid"
    })
    @IsUUID()
    userId: UUID;

    @Column({
        name: "username",
        type: "text"
    })
    @IsString()
    @Matches(ALPHANUMERIC, {
        message: "Usernames can only contain alphanumeric characters"
    })
    username: string;

    @Column({
        name: "firstName",
        type: "text",
        nullable: true
    })
    @IsString()
    @Matches(NAMES, {
        message:
            "Names can only contain alphabetical characters, spaces, and hyphens"
    })
    @IsOptional()
    firstName?: string;

    @Column({
        name: "lastName",
        type: "text",
        nullable: true
    })
    @IsString()
    @Matches(NAMES, {
        message:
            "Names can only contain alphabetical characters, spaces, and hyphens"
    })
    @IsOptional()
    lastName?: string;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: "userId" })
    user: Relation<User>;
}
