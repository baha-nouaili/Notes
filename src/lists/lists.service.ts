import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteRepository } from './data/note.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UserRepository } from './../users/data/users.repository';
import { InviteContributorDto } from './dto/invite-contributor.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { List } from './data/schemas/list.schema';
import { ListRepository } from './data/list.repository';
import { Note } from './data/schemas/note.schema';
import { UpdatePermissionDto } from './dto/update-permission.dto';
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

  async deleteNote(
    listId: string,
    userId: string,
    noteId: string,
  ): Promise<string> {
    const isDeleted = await this.noteRepository.findOneAndDelete({
      _id: noteId,
      list_id: listId,
      note_author: userId,
    });
    if (!isDeleted) throw new UnauthorizedException();
    await this.listRepository.findOneAndUpdate(
      { _id: listId, author: userId },
      {
        $pull: {
          notes: noteId,
        },
      },
    );
    return 'Note deleted';
  }

  async updateNote(
    _id: string,
    list_id: string,
    note_author: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    const updatedNote = await this.noteRepository.findOneAndUpdate(
      {
        _id,
        list_id,
        note_author,
      },
      {
        $set: {
          ...updateNoteDto,
        },
      },
    );
    console.log(updatedNote);
    if (!updatedNote) throw new UnauthorizedException();
    return updatedNote;
  }

  async getNotes(listId: string): Promise<any[] | []> {
    const notes = await this.listRepository.find(
      { _id: listId },
      { notes: 1 },
      'notes',
    );
    if (!notes) throw new InternalServerErrorException();
    return notes;
  }

  async updatePermission(
    listId: string,
    author: string,
    userId: string,
    { permission }: UpdatePermissionDto,
  ) {
    const updatedList = await this.listRepository.findOneAndUpdate(
      {
        _id: listId,
        author,
        'contributors.contributor_id': userId,
      },
      {
        $set: {
          'contributors.$.permission': permission,
        },
      },
    );
    return updatedList;
  }

  async deleteContributor(listId: string, userId: string) {
    const updatedList = await this.listRepository.findOneAndUpdate(
      { _id: listId, 'contributors.contributor_id': userId },
      {
        $pull: {
          contributors: {
            contributor_id: userId,
          },
        },
      },
    );
    if (!updatedList)
      throw new HttpException(
        'Contributor does not exsit',
        HttpStatus.BAD_REQUEST,
      );

    return updatedList;
  }
}
