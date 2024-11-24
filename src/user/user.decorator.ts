import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/entities";

export const ExistingUser = createParamDecorator((_, req: ExecutionContext) => {
    return req.switchToHttp().getRequest()["user"] as User;
});
