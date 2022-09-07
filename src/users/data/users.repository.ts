import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { DeleteResult } from 'mongodb';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(
    filterQuery: FilterQuery<User>,
    projection: ProjectionType<User>,
  ): Promise<User[]> {
    return this.userModel.find(filterQuery, projection);
  }

  async findOne(
    filterQuery: FilterQuery<User>,
    projection: ProjectionType<User>,
  ): Promise<User> {
    return this.userModel.findOne(filterQuery, projection);
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    updateQuery: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(filterQuery, updateQuery);
  }

  async deleteOne(filterQuery: FilterQuery<User>): Promise<DeleteResult> {
    return this.userModel.deleteOne(filterQuery);
  }

  async deleteMany(filterQuery: FilterQuery<User>): Promise<DeleteResult> {
    return this.userModel.deleteMany(filterQuery);
  }
}
