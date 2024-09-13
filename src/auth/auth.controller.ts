import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ProviderTokens } from "src/constants";
import { AuthDTO } from "src/dto";
import { User } from "src/entities";
import { IAuthService } from "src/interfaces";
import { AuthGuard } from "./auth.guard";
import { AuthUser } from "./auth.decorator";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        @Inject(ProviderTokens.IAuthService)
        private authService: IAuthService
    ) {}

    @Post("signup")
    @ApiOperation({
        summary: "Sign up a user"
    })
    @ApiResponse({
        type: String
    })
    public async signup(@Body() dto: AuthDTO): Promise<string> {
        return this.authService.signup(dto);
    }

    @Post("login")
    @ApiOperation({
        summary: "Logs in a user"
    })
    @ApiResponse({
        type: String
    })
    public async login(@Body() dto: AuthDTO): Promise<string> {
        return this.authService.login(dto);
    }

    @Post("logout")
    @ApiOperation({
        summary: "Logs out a user"
    })
    @ApiSecurity("jwt")
    @UseGuards(AuthGuard)
    public async logout(@AuthUser() user: User): Promise<boolean> {
        return this.authService.logout(user.id);
    }
}
