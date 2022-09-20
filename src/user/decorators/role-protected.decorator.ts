import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'common/enum-roles.enum';

export const RoleProtected = (...args: UserRoles[]) => SetMetadata('role-protected', args);
