import { NoteRepository } from './data/note.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UserRepository } from './../users/data/users.repository';
import { InviteContributorDto } from './dto/invite-contributor.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { List } from './data/schemas/list.schema';
import { ListRepository } from './data/list.repository';
import { Note } from './data/schemas/note.schema';
@Injectable()
export class ListsService {
  constructor(
    private listRepository: ListRepository,
    private userRepository: UserRepository,
    private noteRepository: NoteRepository,
  ) {}

  async createNoteList(author: string): Promise<List> {
    const newList = await this.listRepository.create({ author });
    return newList;
  }

  async inviteUser(
    listId: string,
    author: string,
    { contributor_id, permission }: InviteContributorDto,
  ): Promise<List> {
    const contributor = await this.userRepository.findOne({
      _id: contributor_id,
    });
    if (!contributor)
      throw new HttpException(
        'Contributor does not exist',
        HttpStatus.BAD_REQUEST,
      );
    const doesContributorExsit = await this.listRepository.findOne({
      _id: listId,
      author,
      contributors: {
        $elemMatch: {
          contributor_id,
        },
      },
    });

    if (doesContributorExsit)
      throw new HttpException(
        'Contributor already exist',
        HttpStatus.BAD_REQUEST,
      );

    const updatedList = await this.listRepository.findOneAndUpdate(
      { _id: listId, author },
      {
        $push: {
          contributors: {
            permission,
            contributor_id,
          },
        },
      },
    );
    return updatedList;
  }

  async createNote(
    listId: string,
    author: string,
    { content, title }: CreateNoteDto,
  ): Promise<Note> {
    const newNote = await this.noteRepository.create({
      content,
      title,
      list_id: listId,
      note_author: author,
    });
    const updatedList = await this.listRepository.findOneAndUpdate(
      { _id: listId },
      {
        $push: {
          notes: newNote._id,
        },
      },
    );
    if (!newNote && !updatedList) throw new InternalServerErrorException();
    return newNote;
  }
}
