import { ProviderTokens } from "src/constants";
import { ProfileService } from "./profile.service";

export const profileProviders = [
    {
        provide: ProviderTokens.IProfileServie,
        useClass: ProfileService
    }
];
