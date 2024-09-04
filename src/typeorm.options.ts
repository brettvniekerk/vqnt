import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { readFileSync } from "fs";
import * as entities from "./entities";

export const typeormOptions: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DB_HOST"),
        port: +configService.getOrThrow("DB_PORT"),
        username: configService.getOrThrow("DB_USERNAME"),
        password: configService.getOrThrow("DB_PASSWORD"),
        database: configService.getOrThrow("DB_NAME"),
        entities,
        ssl: configService.get("DB_IGNORE_SSL")
            ? undefined
            : {
                  ca: readFileSync("ca-certificate.crt", {
                      encoding: "utf-8"
                  })
              }
    }),
    inject: [ConfigService]
};
