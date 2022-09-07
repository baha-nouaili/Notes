import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export type UserDocument = User & Document;
type ValidatePassword = (password: string) => Promise<boolean>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  isValidPassword?: ValidatePassword;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    throw new InternalServerErrorException();
  }
});

UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new InternalServerErrorException();
  }
};

export default UserSchema;
