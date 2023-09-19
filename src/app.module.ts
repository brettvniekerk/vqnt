import { Module } from "@nestjs/common";
import { RootModule } from "./root/root.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        RootModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
