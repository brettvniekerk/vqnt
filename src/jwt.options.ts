import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtOptions: JwtModuleAsyncOptions = {
    useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: "1d" // expires in 1 day
        }
    })
};
