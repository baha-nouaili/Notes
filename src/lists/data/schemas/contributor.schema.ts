import { Schema, Prop } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Permission } from '../../types/permissions.enum';

@Schema()
export class Contributor {
  @Prop({ required: false })
  _id?: false;

  @Prop({ type: String, enum: Permission, required: true })
  permission: Permission;

  @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  contributor_id: string | Types.ObjectId;
}
