import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { authProviders } from "./auth.providers";
import { JwtModule } from "@nestjs/jwt";
import { jwtOptions } from "src/jwt.options";

@Module({
    imports: [JwtModule.registerAsync(jwtOptions)],
    controllers: [AuthController],
    providers: [...authProviders],
    exports: [...authProviders]
})
export class AuthModule {}
