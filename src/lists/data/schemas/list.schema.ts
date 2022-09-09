import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Contributor } from './contributor.schema';
import { Note } from './note.schema';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  author: string;

  @Prop([{ type: Contributor }])
  contributors: Contributor;

  @Prop([{ type: Note }])
  notes: Note;
}

export const ListSchema = SchemaFactory.createForClass(List);
