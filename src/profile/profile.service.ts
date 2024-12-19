import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityService } from "src/abstractions";
import { Profile } from "src/entities";
import { IProfileService } from "src/interfaces";
import { Repository } from "typeorm";

@Injectable()
export class ProfileService
    extends EntityService<Profile>
    implements IProfileService
{
    constructor(
        @InjectRepository(Profile)
        profileRepository: Repository<Profile>
    ) {
        super(profileRepository);
    }
}
