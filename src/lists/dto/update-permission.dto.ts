import { IsEnum, IsNotEmpty } from 'class-validator';
import { Permission } from '../types/permissions.enum';

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsEnum(Permission, {
    message:
      'Permission must be of type string with the value of  Read-Write || Read-Only',
  })
  permission: Permission;
}
