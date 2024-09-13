import * as bcrypt from "bcrypt";
import { Request } from "express";

export const hash = async (str: string, rounds: number): Promise<string> =>
    new Promise((res, rej) => {
        bcrypt.hash(str, rounds, (err, hash) => {
            if (err) return rej(err);

            res(hash);
        });
    });

export const compare = async (str: string, hash: string): Promise<boolean> =>
    new Promise((res, rej) => {
        bcrypt.compare(str, hash, (err, result) => {
            if (err) return rej(err);

            res(result);
        });
    });

export const extractBearerToken = (request: Request): string | undefined => {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
};
