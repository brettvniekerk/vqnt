import { ProviderTokens } from "src/constants";
import { AuthService } from "./auth.service";
import { TempAuthClient } from "src/clients/TempAuthClient";

export const authProviders = [
    {
        provide: ProviderTokens.IAuthService,
        useClass: AuthService
    },
    {
        provide: "AUTH_CLIENT",
        useClass: TempAuthClient
    }
];
