import { IsMongoId } from 'class-validator';
import * as core from 'express-serve-static-core';

export class UserIdParamDto {
  @IsMongoId()
  userId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserIdParam extends UserIdParamDto, core.ParamsDictionary {}
