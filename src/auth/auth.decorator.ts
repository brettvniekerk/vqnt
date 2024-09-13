import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/entities";

export const AuthUser = createParamDecorator((_, req: ExecutionContext) => {
    return req.switchToHttp().getRequest()["user"] as User;
});
