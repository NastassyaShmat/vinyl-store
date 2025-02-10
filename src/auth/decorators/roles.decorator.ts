import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enums';

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
