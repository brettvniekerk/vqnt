import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtOptions } from "src/jwt.options";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile, User } from "src/entities";
import { profileProviders } from "./profile.providers";

@Module({
    controllers: [ProfileController],
    imports: [
        JwtModule.registerAsync(jwtOptions),
        TypeOrmModule.forFeature([Profile, User])
    ],
    providers: [...profileProviders],
    exports: [...profileProviders]
})
export class ProfileModule {}
