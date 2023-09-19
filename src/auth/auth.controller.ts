import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import {
    ApiOperation,
    ApiResponse,
    ApiSecurity,
    ApiTags
} from "@nestjs/swagger";
import { AuthDTO, SignUpDTO, UserDTO } from "src/dto";
import { IAuthService } from "src/interfaces";
import { AuthGuard } from "./auth.guard";
import { AuthTokenHeader } from "./auth.decorator";
import { ProviderTokens } from "src/constants";

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
    public async signup(@Body() dto: SignUpDTO): Promise<string> {
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
    public async logout(@AuthTokenHeader() jwt: string): Promise<void> {
        return this.authService.logout(jwt);
    }

    @Post("profile")
    @ApiOperation({
        summary: "Gets a user's profile information"
    })
    @ApiResponse({
        type: UserDTO
    })
    @ApiSecurity("jwt")
    @UseGuards(AuthGuard)
    public async profile(@AuthTokenHeader() jwt: string): Promise<UserDTO> {
        return this.authService.getUserByJwt(jwt);
    }
}
