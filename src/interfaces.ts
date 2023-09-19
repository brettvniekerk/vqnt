import { AuthDTO, SignUpDTO, UserDTO } from "./dto";

export interface IRootService {
    hello(): Promise<string>;
}

export interface IAuthService {
    signup(dto: SignUpDTO): Promise<string>; // signup and return JWT
    login(dto: AuthDTO): Promise<string>; // login and return JWT
    logout(jwt: string): Promise<void>; // unpack JWT and log a signout for that user

    getUserByJwt(jwt: string): Promise<UserDTO>;
}

export interface IAuthClient {
    signup(dto: SignUpDTO): Promise<string>; // return user id
    login(dto: AuthDTO): Promise<string>; // return user id

    findUserById(id: string): Promise<UserDTO>; // return User
}
