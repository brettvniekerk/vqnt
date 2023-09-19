import { Module } from "@nestjs/common";
import { rootProviders } from "./root.providers";
import { RootController } from "./root.controller";

@Module({
    controllers: [RootController],
    providers: [...rootProviders],
    exports: [...rootProviders]
})
export class RootModule {}
