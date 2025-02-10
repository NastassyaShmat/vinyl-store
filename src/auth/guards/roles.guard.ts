import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from 'src/enums';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<UserRole[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredRoles.length) {
      return true;
    }
    const user: User = context.switchToHttp().getRequest().user;
    const userRole = user.role;

    return requiredRoles.includes(userRole);
  }
}
