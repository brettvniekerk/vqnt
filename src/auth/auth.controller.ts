import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import {
    ApiOperation,
    ApiResponse,
    ApiSecurity,
    ApiTags
} from "@nestjs/swagger";
import { ProviderTokens, SecurityTokens } from "src/constants";
import { LoginDTO, SignupDTO } from "src/dto";
import { User } from "src/entities";
import { IAuthService } from "src/interfaces";
import { ExistingUser } from "src/user/user.decorator";
import { ExistingUserGuard } from "src/user/user.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        @Inject(ProviderTokens.IAuthService)
        private authService: IAuthService
    ) {}

    @Post("signup")
    @ApiOperation({
        summary: "Signs up a new user"
    })
    @ApiResponse({
        type: String
    })
    public async signup(@Body() data: SignupDTO): Promise<string> {
        return this.authService.signup(data);
    }

    @Post("login")
    @ApiOperation({
        summary: "Logs in a user"
    })
    @ApiResponse({
        type: String
    })
    public async login(@Body() data: LoginDTO): Promise<string> {
        return this.authService.login(data);
    }

    @Post("logout")
    @ApiOperation({
        summary: "Logs out the current user"
    })
    @ApiResponse({
        type: Boolean
    })
    @ApiSecurity(SecurityTokens.JWT)
    @UseGuards(ExistingUserGuard)
    public async logout(@ExistingUser() user: User): Promise<boolean> {
        return this.authService.logout(user);
    }
}
