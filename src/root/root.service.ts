import { Injectable } from "@nestjs/common";
import { IRootService } from "src/interfaces";

@Injectable()
export class RootService implements IRootService {
    public async hello(): Promise<string> {
        return `Hello World, ${new Date().toISOString()}`;
    }
}
