import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { EntityService } from "src/abstractions";
import { Repository } from "typeorm";
import { IUserService } from "src/interfaces";

@Injectable()
export class UserService extends EntityService<User> implements IUserService {
    constructor(
        @InjectRepository(User)
        userRepository: Repository<User>
    ) {
        super(userRepository);
    }
}
