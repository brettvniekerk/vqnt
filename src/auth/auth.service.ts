import { Inject, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignUpDTO, AuthDTO, UserDTO } from "src/dto";
import { IAuthClient, IAuthService } from "src/interfaces";

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private jwtService: JwtService,
        @Inject("AUTH_CLIENT")
        private authClient: IAuthClient
    ) {}

    public async signup(dto: SignUpDTO): Promise<string> {
        const id = await this.authClient.signup(dto);

        this.logger.log(`Signed up new user ${id}`);

        const token = await this.jwtService.signAsync({ id });

        return token;
    }

    public async login(dto: AuthDTO): Promise<string> {
        const id = await this.authClient.login(dto);

        this.logger.log(`User ${id} just logged in`);

        const token = await this.jwtService.signAsync({ id });

        return token;
    }

    // protected by guard
    public async logout(jwt: string): Promise<void> {
        const { id } = this.jwtService.decode(jwt) as { id: string };

        this.logger.log(`User ${id} just logged out`);
    }

    // protected by guard
    public async getUserByJwt(jwt: string): Promise<UserDTO> {
        const { id } = this.jwtService.decode(jwt) as { id: string };

        return this.authClient.findUserById(id);
    }
}
