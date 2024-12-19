import { Module } from "@nestjs/common";
import { userProviders } from "./user.providers";
import { JwtModule } from "@nestjs/jwt";
import { jwtOptions } from "src/jwt.options";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { UserController } from "./user.controller";
import { ProfileModule } from "src/profile/profile.module";

@Module({
    controllers: [UserController],
    imports: [
        JwtModule.registerAsync(jwtOptions),
        TypeOrmModule.forFeature([User]),
        ProfileModule
    ],
    providers: [...userProviders],
    exports: [...userProviders]
})
export class UserModule {}
