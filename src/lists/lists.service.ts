import { ListRepository } from './data/list.repository';
import { Injectable } from '@nestjs/common';
import { RequestService } from '../shared/Auth/request.service';

@Injectable()
export class ListsService {
  constructor(
    private requestService: RequestService,
    private listRepository: ListRepository,
  ) {}
}
