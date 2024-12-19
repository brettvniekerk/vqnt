import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtOptions } from "src/jwt.options";
import { UserModule } from "src/user/user.module";
import { authProviders } from "./auth.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { ProfileModule } from "src/profile/profile.module";

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync(jwtOptions),
        TypeOrmModule.forFeature([User]),
        UserModule,
        ProfileModule
    ],
    providers: [...authProviders],
    exports: [...authProviders]
})
export class AuthModule {}
