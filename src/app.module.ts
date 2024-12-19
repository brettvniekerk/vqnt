import { Module } from "@nestjs/common";
import { RootModule } from "./root/root.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormOptions } from "./typeorm.options";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync(typeormOptions),
        RootModule,
        AuthModule,
        UserModule,
        ProfileModule
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
