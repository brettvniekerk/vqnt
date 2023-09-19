import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    private _extractToken(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this._extractToken(request);

        if (!token) throw new UnauthorizedException();

        try {
            const { id } = this.jwtService.decode(token) as { id: string };

            // logic to check if the user exists
            // ...
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
