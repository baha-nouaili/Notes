import {
  Document,
  Model,
  FilterQuery,
  ProjectionType,
  UpdateQuery,
  AggregateOptions,
} from 'mongoose';
import { DeleteResult } from 'mongodb';

export abstract class ApplicationRepository<T extends Document> {
  constructor(protected readonly domainModel: Model<T>) {}

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    populate?: string,
  ): Promise<T[] | []> {
    return this.domainModel
      .find(filterQuery, projection)
      .populate(populate)
      .exec();
  }

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    populate?: string,
  ): Promise<T | any> {
    return this.domainModel
      .findOne(filterQuery, projection)
      .populate(populate)
      .exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.domainModel.create(data);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.domainModel
      .findOneAndUpdate(filterQuery, updateQuery, { projection, new: true })
      .exec();
  }

  async updateOne(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
  ): Promise<any> {
    return this.domainModel.updateOne(filterQuery, updateQuery, { new: true });
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<DeleteResult> {
    return this.domainModel.deleteOne(filterQuery).exec();
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<DeleteResult> {
    return this.domainModel.deleteMany(filterQuery).exec();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>) {
    return this.domainModel.findOneAndDelete(filterQuery);
  }
}
