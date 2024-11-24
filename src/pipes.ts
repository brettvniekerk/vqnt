import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UUID } from "crypto";
import { UUID_REGEX } from "src/regex";

@Injectable()
export class UUIDPipe implements PipeTransform {
    public transform(value: any): UUID {
        if (!UUID_REGEX.test(value))
            throw new BadRequestException(`${value} is not a UUID v4`);

        return value;
    }
}
