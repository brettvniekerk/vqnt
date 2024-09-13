import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UUID } from "crypto";
import { ProviderTokens } from "src/constants";
import { AuthDTO } from "src/dto";
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

    private async _createJwtFromUser(user: User): Promise<string> {
        return this.jwtService.signAsync({
            id: user.id,
            email: user.email
        });
    }

    private _validateAuthInfo(dto: AuthDTO): void {
        if (!dto.email) throw new BadRequestException("Missing email");
        if (!dto.password) throw new BadRequestException("Missing password");
    }

    private async _validateSignupInfo(dto: AuthDTO): Promise<void> {
        const existingUser = await this.userService.getUserBy({
            email: dto.email.toLowerCase()
        });

        if (existingUser) throw new UnauthorizedException("User already exists");

        this._validateAuthInfo(dto);
    }

    public async signup(dto: AuthDTO): Promise<string> {
        await this._validateSignupInfo(dto);

        const hashedPassword = await utils.security.hash(
            dto.password,
            +this.configService.getOrThrow("BCRYPT_SALT_ROUNDS")
        );

        const newUser = await this.userService.saveUserInfo({
            email: dto.email.toLowerCase(),
            password: hashedPassword
        });

        const token = await this._createJwtFromUser(newUser);

        this.logger.log(`New user ${newUser.id} signed up`);

        return token;
    }

    public async login(dto: AuthDTO): Promise<string> {
        this._validateAuthInfo(dto);

        const user = await this.userService.getUserBy({
            email: dto.email.toLowerCase()
        });

        if (!user) throw new NotFoundException("Could not find user");

        const matchingPassword = await utils.security.compare(dto.password, user.password);

        if (!matchingPassword) throw new UnauthorizedException("Incorrect password");

        const token = await this._createJwtFromUser(user);

        this.logger.log(`User ${user.id} logged in`);

        return token;
    }

    // ! protected by guard
    public async logout(userId: UUID): Promise<boolean> {
        const user = await this.userService.getUserBy({
            id: userId
        });

        if (!user) throw new NotFoundException("Could not find user");

        // TODO: better logging
        this.logger.log(`User ${user.id} just logged out`);

        return true;
    }
}
