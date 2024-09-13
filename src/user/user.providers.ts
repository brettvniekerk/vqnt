import { ProviderTokens } from "src/constants";
import { UserService } from "./user.service";

export const userProviders = [
    {
        provide: ProviderTokens.IUserService,
        useClass: UserService
    }
];
