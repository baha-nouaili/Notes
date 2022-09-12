import { IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';
import { Permission } from '../types/permissions.enum';
import { ApiProperty } from '@nestjs/swagger';

export class InviteContributorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  contributor_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Permission, {
    message:
      'Permission must be of type string with the value of  Read-Write || Read-Only',
  })
  permission: Permission;
}
