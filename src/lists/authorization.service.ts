import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ListRepository } from './data/list.repository';
@Injectable()
export class AuthorizationService {
  constructor(private listRepository: ListRepository) {}

  async checkIsAuthor(listId: string, userId: string): Promise<boolean> {
    const isAuthor = await this.listRepository.findOne({
      _id: listId,
      author: userId,
    });
    if (!isAuthor) throw new UnauthorizedException();
    return true;
  }
}
