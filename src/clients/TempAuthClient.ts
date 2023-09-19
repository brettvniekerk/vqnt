import { Injectable } from "@nestjs/common";
import { AuthDTO, SignUpDTO, UserDTO } from "src/dto";
import { IAuthClient } from "src/interfaces";

type UserWithPassword = UserDTO & {
    password: string;
};

// temp client memory
const USERS: Array<UserWithPassword> = [];

@Injectable()
export class TempAuthClient implements IAuthClient {
    // strip off the password
    private _userWithPasswordToDto(user: UserWithPassword): UserDTO {
        return {
            id: user.id,
            email: user.email
        };
    }

    // for now append newest user and return that new ID
    public async signup(dto: SignUpDTO): Promise<string> {
        const newId = USERS.length.toString();

        USERS.push({
            id: newId,
            email: dto.email,
            password: dto.password
        });

        return newId;
    }

    public async login(dto: AuthDTO): Promise<string> {
        const user = USERS.find(
            u => u.email === dto.email && u.password === dto.password
        );

        if (!user) throw new Error("Failed to login user");

        return user.id;
    }

    public async findUserById(id: string): Promise<UserDTO> {
        const user = USERS.find(u => u.id === id);

        if (!user) throw new Error("Failed to find user");

        return this._userWithPasswordToDto(user);
    }
}
