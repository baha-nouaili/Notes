import { Schema, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Notes {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  note_author: string;
}
