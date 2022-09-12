import { IsEnum, IsNotEmpty } from 'class-validator';
import { Permission } from '../types/permissions.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Permission, {
    message:
      'Permission must be of type string with the value of  Read-Write || Read-Only',
  })
  permission: Permission;
}
