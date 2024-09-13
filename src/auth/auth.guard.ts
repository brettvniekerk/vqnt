import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import utils from "src/utils";
import { Repository } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = utils.security.extractBearerToken(request);

        if (!token) throw new UnauthorizedException();

        try {
            const { email } = await this.jwtService.verifyAsync(token, {
                secret: this.configService.getOrThrow("JWT_SECRET"),
                ignoreExpiration: false
            });

            const user = await this.userRepository.findOneByOrFail({
                email
            });

            request["user"] = user;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
