import { IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';
import { Permission } from '../types/permissions.enum';

export class InviteContributorDto {
  @IsNotEmpty()
  @IsMongoId()
  contributor_id: string;

  @IsNotEmpty()
  @IsEnum(Permission, {
    message:
      'Permission must be of type string with the value of  Read-Write || Read-Only',
  })
  permission: Permission;
}
