import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApplicationRepository } from '../../shared/DB/application.repository';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NoteRepository extends ApplicationRepository<NoteDocument> {
  constructor(@InjectModel(Note.name) listModel: Model<NoteDocument>) {
    super(listModel);
  }
}
