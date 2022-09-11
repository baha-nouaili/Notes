import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UpdateNoteDto } from '../dto/update-note.dto';

@Injectable()
export class NoteUpdateValidate implements PipeTransform {
  transform(value: UpdateNoteDto, metadata: ArgumentMetadata) {
    if (!value.content && !value.title)
      throw new HttpException(
        'You must at least update the title or the content.',
        HttpStatus.BAD_REQUEST,
      );
    return value;
  }
}
