import { ApiProperty } from "@nestjs/swagger";
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Matches
} from "class-validator";
import { ALPHANUMERIC, BCRYPT_REGEX, NAMES } from "./regex";
import { UUID } from "crypto";

// * thanks https://patorjk.com/software/taag/#p=display&f=Big

// !   _____            _             _ _             _____ _______ ____  _
// !  / ____|          | |           | | |           |  __ \__   __/ __ \( )
// ! | |     ___  _ __ | |_ _ __ ___ | | | ___ _ __  | |  | | | | | |  | |/ ___
// ! | |    / _ \| '_ \| __| '__/ _ \| | |/ _ \ '__| | |  | | | | | |  | | / __|
// ! | |___| (_) | | | | |_| | | (_) | | |  __/ |    | |__| | | | | |__| | \__ \
// !  \_____\___/|_| |_|\__|_|  \___/|_|_|\___|_|    |_____/  |_|  \____/  |___/
// !

// ! auth

export class LoginDTO {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignupDTO extends LoginDTO {
    @ApiProperty()
    @IsString()
    @Matches(ALPHANUMERIC, {
        message: "Usernames can only contain alphanumeric characters"
    })
    @IsNotEmpty()
    username: string;
}

// ! user

export class PatchUserDTO {
    @ApiProperty({
        required: false
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @Matches(BCRYPT_REGEX, {
        message: "A hashed password was not provided"
    })
    @IsOptional()
    password?: string;
}

// ! profile

export class PatchProfileDTO {
    @ApiProperty({
        required: false
    })
    @IsString()
    @Matches(ALPHANUMERIC, {
        message: "Usernames can only contain alphanumeric characters"
    })
    @IsOptional()
    username?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @Matches(NAMES, {
        message:
            "Names can only contain alphabetical characters, spaces, and hyphens"
    })
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @Matches(NAMES, {
        message:
            "Names can only contain alphabetical characters, spaces, and hyphens"
    })
    @IsOptional()
    lastName?: string;
}

// !   ______       _   _ _           _____ _______ ____  _
// !  |  ____|     | | (_) |         |  __ \__   __/ __ \( )
// !  | |__   _ __ | |_ _| |_ _   _  | |  | | | | | |  | |/ ___
// !  |  __| | '_ \| __| | __| | | | | |  | | | | | |  | | / __|
// !  | |____| | | | |_| | |_| |_| | | |__| | | | | |__| | \__ \
// !  |______|_| |_|\__|_|\__|\__, | |_____/  |_|  \____/  |___/
// !                           __/ |
// !                          |___/
// !

// ! user

export class UserDTO {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: UUID;

    @ApiProperty()
    @IsString()
    @Matches(ALPHANUMERIC, {
        message: "Usernames can only contain alphanumeric characters"
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;
}

export class UpdatedUserDTO extends UserDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    jwt: string;
}

// ! profile

export class ProfileDTO {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: UUID;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    userId: UUID;

    @ApiProperty()
    @IsString()
    @Matches(ALPHANUMERIC, {
        message: "Usernames can only contain alphanumeric characters"
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @Matches(NAMES, {
        message:
            "Names can only contain alphabetical characters, spaces, and hyphens"
    })
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @Matches(NAMES, {
        message:
            "Names can only contain alphabetical characters, spaces, and hyphens"
    })
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        required: false
    })
    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
