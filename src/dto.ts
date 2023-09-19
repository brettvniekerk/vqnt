import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class SignUpDTO extends AuthDTO {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;
}

// extend with user metadata
export class UserDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;
}
