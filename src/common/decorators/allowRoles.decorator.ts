import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums';

export const AllowRoles = (...roles: Role[]) =>
  SetMetadata('roles', roles);
