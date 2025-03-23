import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsIn, IsOptional, Matches } from "class-validator";
import { Role } from "src/common/enums";
import { REGEXES, VALID_MESSAGES } from "../constants";

export class CreateUserDTO {
    @ApiProperty({ example: "Brian" })
    @IsDefined()
    @Matches(REGEXES.name, {
        message: VALID_MESSAGES.firstName,
    })
    firstName: string;

    @ApiProperty({ example: "O'Brian" })
    @IsDefined()
    @Matches(REGEXES.name, {
        message: VALID_MESSAGES.lastName,
    })
    lastName: string;

    @ApiProperty({ example: "brian.obrian@example.com" })
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ example: Role.USER })
    @IsOptional()
    @IsIn(Object.values(Role))
    role?: Role;

    @ApiProperty({ example: "Default_123" })
    @IsDefined()
    @Matches(REGEXES.password, {
        message: VALID_MESSAGES.password,
    })
    password: string;
}
