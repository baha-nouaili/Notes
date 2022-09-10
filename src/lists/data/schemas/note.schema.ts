import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  note_author: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId, ref: 'List' })
  list_id: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
