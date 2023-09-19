import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProviderTokens } from "src/constants";
import { IRootService } from "src/interfaces";

@Controller()
@ApiTags("root")
export class RootController {
    constructor(
        @Inject(ProviderTokens.IRootService)
        private rootService: IRootService
    ) {}

    @Get()
    @ApiOperation({
        summary: "Returns a hello world status"
    })
    @ApiResponse({
        type: String
    })
    public async hello(): Promise<string> {
        return this.rootService.hello();
    }
}
