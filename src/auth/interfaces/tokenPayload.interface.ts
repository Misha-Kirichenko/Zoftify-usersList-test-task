import { Role } from "src/common/enums";

export interface ITokenPayload {
    readonly id: number;
    readonly email: string;
    readonly role: Role;
}