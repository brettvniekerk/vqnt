import { UUID } from "crypto";
import { FindOptionsWhere } from "typeorm";
import { AuthDTO } from "./dto";
import { User } from "./entities";

export interface IRootService {
    hello(): Promise<string>;
}

export interface IUserService {
    getUserBy(options: FindOptionsWhere<User>): Promise<User | null>;
    saveUserInfo(data: Partial<User>): Promise<User>;
}

export interface IAuthService {
    signup(dto: AuthDTO): Promise<string>;
    login(dto: AuthDTO): Promise<string>;
    logout(userId: UUID): Promise<boolean>;
}
