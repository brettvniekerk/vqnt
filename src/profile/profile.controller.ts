import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    UseGuards
} from "@nestjs/common";
import {
    ApiOperation,
    ApiResponse,
    ApiSecurity,
    ApiTags
} from "@nestjs/swagger";
import { UUID } from "crypto";
import { ProviderTokens, SecurityTokens } from "src/constants";
import { PatchProfileDTO, ProfileDTO } from "src/dto";
import { Profile, User } from "src/entities";
import { IProfileService } from "src/interfaces";
import { UUIDPipe } from "src/pipes";
import { ExistingUser } from "src/user/user.decorator";
import { ExistingUserGuard } from "src/user/user.guard";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
    constructor(
        @Inject(ProviderTokens.IProfileServie)
        private profileService: IProfileService
    ) {}

    // ! utils

    private _entityToDTO(entity: Profile): ProfileDTO {
        return {
            id: entity.id,
            userId: entity.userId,
            username: entity.username,
            firstName: entity.firstName,
            lastName: entity.lastName,
            updatedAt: entity.updatedAt
        };
    }

    private async _getProfileOrFail(userId: UUID): Promise<Profile> {
        const profile = await this.profileService.getOneBy({
            userId
        });

        if (!profile)
            throw new BadRequestException(
                `Failed to get profile for user ${userId}`
            );

        return profile;
    }

    // ! methods

    @Get()
    @ApiOperation({
        summary: "Gets the current user's profile"
    })
    @ApiResponse({
        type: ProfileDTO
    })
    @ApiSecurity(SecurityTokens.JWT)
    @UseGuards(ExistingUserGuard)
    public async getCurrentProfile(
        @ExistingUser() user: User
    ): Promise<ProfileDTO> {
        const profile = await this._getProfileOrFail(user.id);

        return this._entityToDTO(profile);
    }

    @Get(":userId")
    @ApiOperation({
        summary: "Gets a given user's profile by their ID"
    })
    @ApiResponse({
        type: ProfileDTO
    })
    public async getProfile(
        @Param("userId", new UUIDPipe()) userId: UUID
    ): Promise<ProfileDTO> {
        const profile = await this._getProfileOrFail(userId);

        // ! business logic may want these kept
        delete profile.firstName;
        delete profile.lastName;

        return this._entityToDTO(profile);
    }

    @Patch()
    @ApiOperation({
        summary: "Edits the current user's profile"
    })
    @ApiResponse({
        type: ProfileDTO
    })
    @ApiSecurity(SecurityTokens.JWT)
    @UseGuards(ExistingUserGuard)
    public async patchProfile(
        @ExistingUser() user: User,
        @Body() data: PatchProfileDTO
    ): Promise<ProfileDTO> {
        const profile = await this._getProfileOrFail(user.id);

        if (data.username) {
            const existingUsername = await this.profileService.getOneBy({
                username: data.username
            });

            if (existingUsername) {
                throw new BadRequestException(
                    `Cannot change username to ${data.username} as it's already taken`
                );
            }
        }

        const updatedProfile = await this.profileService.save(profile, data);

        return this._entityToDTO(updatedProfile);
    }
}
