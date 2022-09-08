import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApplicationRepository } from '../../shared/DB/application.repository';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends ApplicationRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
