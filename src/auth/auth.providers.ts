import { ProviderTokens } from "src/constants";
import { AuthService } from "./auth.service";

export const authProviders = [
    {
        provide: ProviderTokens.IAuthService,
        useClass: AuthService
    }
];
