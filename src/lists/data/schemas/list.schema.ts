import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Contributors } from './contributor.schema';
import { Notes } from './notes.schema';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  author: string;

  @Prop([{ type: Contributors }])
  contributors: Contributors;

  @Prop([{ type: Notes }])
  notes: Notes;
}

export const ListSchema = SchemaFactory.createForClass(List);
