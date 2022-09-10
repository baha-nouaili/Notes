import { IsMongoId } from 'class-validator';
import * as core from 'express-serve-static-core';

export class NoteParamDto {
  @IsMongoId()
  noteId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NoteParam extends NoteParamDto, core.ParamsDictionary {}
