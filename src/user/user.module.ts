import { Module } from "@nestjs/common";
import { userProviders } from "./user.providers";
import { JwtModule } from "@nestjs/jwt";
import { jwtOptions } from "src/jwt.options";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";

@Module({
    imports: [JwtModule.registerAsync(jwtOptions), TypeOrmModule.forFeature([User])],
    providers: [...userProviders],
    exports: [...userProviders]
})
export class UserModule {}
