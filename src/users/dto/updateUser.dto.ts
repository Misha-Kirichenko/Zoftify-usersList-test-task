import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, Matches } from "class-validator";
import { Role } from "src/common/enums";
import { REGEXES, VALID_MESSAGES } from "../constants";

export class UpdateUserDTO {
    @ApiPropertyOptional({ example: "John" })
    @IsOptional()
    @Matches(REGEXES.name, {
        message: VALID_MESSAGES.firstName,
    })
    firstName?: string;

    @ApiPropertyOptional({ example: "Jones" })
    @IsOptional()
    @Matches(REGEXES.name, {
        message: VALID_MESSAGES.lastName,
    })
    lastName?: string;

    @ApiPropertyOptional({ example: "john.jones@example.com" })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: Role.USER })
    @IsOptional()
    @IsIn(Object.values(Role))
    role?: Role;

    @ApiPropertyOptional({ example: "Pa$$word123" })
    @IsOptional()
    @Matches(REGEXES.password, {
        message: VALID_MESSAGES.password,
    })
    password?: string;
}
