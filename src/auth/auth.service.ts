import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ProviderTokens } from "src/constants";
import { LoginDTO, SignupDTO } from "src/dto";
import { User } from "src/entities";
import { IAuthService, IUserService } from "src/interfaces";
import utils from "src/utils";

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @Inject(ProviderTokens.IUserService)
        private userService: IUserService
    ) {}

    // ! utils

    private async _createJwtFromEntity(user: User): Promise<string> {
        return this.jwtService.signAsync({
            id: user.id,
            email: user.email
        });
    }

    private async _validateSignupDTO(dto: SignupDTO): Promise<void> {
        const existingUser = await this.userService.getOneBy({
            email: dto.email.toLowerCase()
        });

        if (existingUser)
            throw new UnauthorizedException("User already exists");
    }

    // ! public

    public async signup(dto: SignupDTO): Promise<string> {
        await this._validateSignupDTO(dto);

        const hashedPassword = await utils.security.hash(
            dto.password,
            +this.configService.getOrThrow("BCRYPT_SALT_ROUNDS")
        );

        const newUser = await this.userService.save({} as User, {
            email: dto.email.toLowerCase(),
            password: hashedPassword
        });

        const token = await this._createJwtFromEntity(newUser);

        this.logger.log(`New user ${newUser.id} (${newUser.email}) signed up`);

        return token;
    }

    public async login(dto: LoginDTO): Promise<string> {
        const user = await this.userService.getOneBy({
            email: dto.email.toLowerCase()
        });

        if (!user) throw new BadRequestException("Incorrect email or password");

        const matchingPassword = await utils.security.compare(
            dto.password,
            user.password
        );

        if (!matchingPassword)
            throw new UnauthorizedException("Incorrect email or password");

        const token = await this._createJwtFromEntity(user);

        this.logger.log(`User ${user.id} (${user.email}) logged in `);

        return token;
    }

    public async logout(user: User): Promise<boolean> {
        this.logger.log(`User ${user.id} just logged out`);

        return true;
    }
}
