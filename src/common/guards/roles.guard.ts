import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from '../enums';
import { HTTP_ERROR_MSG } from '../constants';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.get<Role[]>(
        'roles',
        context.getHandler()
      );
  
      const request = context.switchToHttp().getRequest();

      if(!requiredRoles.includes(request["user"]["role"])){
        throw new ForbiddenException(HTTP_ERROR_MSG.FORBIDDEN);
      }
  
      return true;
    }
  }
  