import { IsMongoId } from 'class-validator';
import * as core from 'express-serve-static-core';
import { ApiParam } from '@nestjs/swagger';

export class ListParamDto {
  @IsMongoId()
  listId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListParam extends ListParamDto, core.ParamsDictionary {}
