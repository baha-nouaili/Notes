import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApplicationRepository } from '../../shared/DB/application.repository';
import { List, ListDocument } from './schemas/list.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListRepository extends ApplicationRepository<ListDocument> {
  constructor(@InjectModel(List.name) listModel: Model<ListDocument>) {
    super(listModel);
  }

  async aggregate(pipe: any[]) {
    return await this.domainModel.aggregate(pipe).exec();
  }
}
