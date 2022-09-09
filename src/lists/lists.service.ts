import { ListRepository } from './data/list.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestService } from '../shared/Auth/request.service';
import { List } from './data/schemas/list.schema';

@Injectable()
export class ListsService {
  constructor(
    private requestService: RequestService,
    private listRepository: ListRepository,
  ) {}

  async createNoteList(): Promise<List> {
    const author = this.requestService.getUserId();
    if (!author) throw new UnauthorizedException();
    const newList = await this.listRepository.create({ author });
    return newList;
  }
}
