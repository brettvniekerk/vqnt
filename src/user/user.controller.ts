import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Patch,
    UseGuards
} from "@nestjs/common";
import {
    ApiOperation,
    ApiResponse,
    ApiSecurity,
    ApiTags
} from "@nestjs/swagger";
import { ProviderTokens, SecurityTokens } from "src/constants";
import { PatchUserDTO, UpdatedUserDTO, UserDTO } from "src/dto";
import { User } from "src/entities";
import { IUserService } from "src/interfaces";
import { ExistingUserGuard } from "./user.guard";
import { ExistingUser } from "./user.decorator";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
@ApiTags("user")
export class UserController {
    constructor(
        private jwtService: JwtService,
        @Inject(ProviderTokens.IUserService)
        private userService: IUserService
    ) {}

    // ! utils

    private _entityToDTO(entity: User): UserDTO {
        return {
            id: entity.id,
            email: entity.email.toLowerCase(),
            createdAt: entity.createdAt
        };
    }

    private async _entityToUpdatedUser(user: User): Promise<UpdatedUserDTO> {
        const jwt = await this.jwtService.signAsync({
            id: user.id,
            email: user.email
        });

        return {
            ...this._entityToDTO(user),
            jwt
        };
    }

    // ! methods

    @Get()
    @ApiOperation({
        summary: "Gets the current user"
    })
    @ApiResponse({
        type: UserDTO
    })
    @ApiSecurity(SecurityTokens.JWT)
    @UseGuards(ExistingUserGuard)
    public async getUser(@ExistingUser() user: User): Promise<UserDTO> {
        return this._entityToDTO(user);
    }

    @Patch()
    @ApiOperation({
        summary: "Edits the current user"
    })
    @ApiResponse({
        type: UpdatedUserDTO
    })
    @ApiSecurity(SecurityTokens.JWT)
    @UseGuards(ExistingUserGuard)
    public async patchUser(
        @ExistingUser() user: User,
        @Body() data: PatchUserDTO
    ): Promise<UpdatedUserDTO> {
        const updatedUser = await this.userService.save(user, data);

        return this._entityToUpdatedUser(updatedUser);
    }

    @Delete()
    @ApiOperation({
        summary: "Deletes the current user"
    })
    @ApiResponse({
        type: Boolean
    })
    @ApiSecurity(SecurityTokens.JWT)
    @UseGuards(ExistingUserGuard)
    public async deleteUser(@ExistingUser() user: User): Promise<boolean> {
        await this.userService.remove(user);

        return true;
    }
}
