import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const AuthTokenHeader = createParamDecorator(
    (_, req: ExecutionContext) => {
        const raw = req.switchToHttp().getRequest();
        const [, token] = raw.headers.authorization?.split(" ") ?? [];

        // return the token so that the decorator can be used to extract the jwt token from the request
        return token;
    }
);
