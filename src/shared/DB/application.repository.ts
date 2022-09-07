import { Document, Model, FilterQuery, ProjectionType } from 'mongoose';
import { DeleteResult } from 'mongodb';

export abstract class ApplicationRepository<T extends Document> {
  constructor(protected readonly domainModel: Model<T>) {}

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T[] | []> {
    return this.domainModel.find(filterQuery, projection).exec();
  }

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.domainModel.findOne(filterQuery, projection).exec();
  }

  async create(data: any): Promise<T> {
    return this.domainModel.create(data);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: Partial<T>,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.domainModel
      .findOneAndUpdate(filterQuery, updateQuery, { projection, new: true })
      .exec();
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<DeleteResult> {
    return this.domainModel.deleteOne(filterQuery).exec();
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<DeleteResult> {
    return this.domainModel.deleteMany(filterQuery).exec();
  }
}
