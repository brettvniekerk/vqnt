import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { Profile, RootEntity, User } from "./entities";
import { SignupDTO, LoginDTO } from "./dto";

export interface IRootService {
    hello(): Promise<string>;
}

export interface IEntityService<E extends RootEntity> {
    getOneBy(options: FindOptionsWhere<E>): Promise<E | null>;
    getManyBy(options: FindOptionsWhere<E>): Promise<Array<E>>;
    findBy(options: FindManyOptions<E>): Promise<Array<E>>;

    save(entity: E, data: Partial<E>): Promise<E>;

    remove(...entities: Array<E>): Promise<Array<E>>;
}

export interface IAuthService {
    signup(dto: SignupDTO): Promise<string>;
    login(dto: LoginDTO): Promise<string>;
    logout(user: User): Promise<boolean>;
}

export interface IUserService extends IEntityService<User> {}

export interface IProfileService extends IEntityService<Profile> {}
