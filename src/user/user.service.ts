import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { IUserService } from "src/interfaces";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    public async getUserBy(options: FindOptionsWhere<User>): Promise<User | null> {
        return this.userRepository.findOneBy(options);
    }

    public async saveUserInfo(data: Partial<User>): Promise<User> {
        return this.userRepository.save(data);
    }
}
