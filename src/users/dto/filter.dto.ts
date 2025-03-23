import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { PagingDTO } from "src/common/dto";
import { Role } from "src/common/enums";

export class FilterDTO extends PagingDTO {
    @ApiPropertyOptional({ example: Role.USER })
    @IsIn(Object.values(Role))
    @IsOptional()
    role?: Role
}