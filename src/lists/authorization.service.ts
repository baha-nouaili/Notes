import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ListRepository } from './data/list.repository';
import { NoteRepository } from './data/note.repository';
import { Permission } from './types/permissions.enum';
@Injectable()
export class AuthorizationService {
  constructor(
    private listRepository: ListRepository,
    private noteRepository: NoteRepository,
  ) {}

  async checkIsAuthor(listId: string, userId: string): Promise<boolean> {
    const isAuthor = await this.listRepository.findOne({
      _id: listId,
      author: userId,
    });
    if (!isAuthor) throw new UnauthorizedException();
    return true;
  }

  async checkIsAuthorOrReadWriteCont(
    listId: string,
    userId: string,
  ): Promise<boolean> {
    const isAuthorOrRWContributor = await this.listRepository.findOne({
      _id: listId,
      $or: [
        { author: userId },
        {
          contributors: {
            $elemMatch: {
              contributor_id: userId,
              permission: Permission.RW,
            },
          },
        },
      ],
    });
    if (!isAuthorOrRWContributor)
      throw new UnauthorizedException('Not authorized to write to this list.');
    return true;
  }

  async checkIsAuthorOrContibutor(
    listId: string,
    userId: string,
  ): Promise<boolean> {
    const isAuthorOrContributor = await this.listRepository.findOne({
      _id: listId,
      'contributors. contributor_id': userId,
    });
    if (!isAuthorOrContributor) throw new UnauthorizedException();
    return true;
  }
}
