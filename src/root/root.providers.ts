import { ProviderTokens } from "src/constants";
import { RootService } from "./root.service";

export const rootProviders = [
    {
        provide: ProviderTokens.IRootService,
        useClass: RootService
    }
];
