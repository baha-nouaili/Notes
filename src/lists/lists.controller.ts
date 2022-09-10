import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { isAuthorGuard } from './guards/isAuthor.guard';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { List } from './data/schemas/list.schema';
import { InviteContributorDto } from './dto/invite-contributor.dto';
import { ListParamDto } from './dto/listIdParam.dto';
import { RequestService } from '../shared/Auth/request.service';
import { isAuthorOrReadAndWriteCont } from './guards/isAuthorOrReadWriteCont.guard';
import { Note } from './data/schemas/note.schema';
import { NoteParamDto } from './dto/noteidParam.dto';
import { NoteUpdateValidate } from './pipes/update-note.pipe';

@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private readonly requestService: RequestService,
  ) {}

  @Post('create-list')
  createNoteList(): Promise<List> {
    const author = this.requestService.getUserId();
    return this.listsService.createNoteList(author);
  }

  @UseGuards(isAuthorGuard)
  @Post(':listId/invite-user')
  inviteUser(
    @Param() { listId }: ListParamDto,
    @Body() inviteContributorDto: InviteContributorDto,
  ): Promise<List> {
    const author = this.requestService.getUserId();
    return this.listsService.inviteUser(listId, author, inviteContributorDto);
  }

  @UseGuards(isAuthorOrReadAndWriteCont)
  @Post(':listId/add-note')
  addNote(
    @Param() { listId }: ListParamDto,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const author = this.requestService.getUserId();
    return this.listsService.createNote(listId, author, createNoteDto);
  }

  @UseGuards(isAuthorOrReadAndWriteCont)
  @Delete(':listId/:noteId/delete-note')
  deleteNote(
    @Param() { listId }: ListParamDto,
    @Param() { noteId }: NoteParamDto,
  ): Promise<string> {
    const userId = this.requestService.getUserId();
    return this.listsService.deleteNote(listId, userId, noteId);
  }

  // @UseGuards(isAuthorOrReadAndWriteCont)
  @Put(':listId/:noteId')
  updateNote(
    // @Param() { listId }: ListParamDto,
    // @Param() { noteId }: NoteParamDto,
    @Body(new NoteUpdateValidate()) updateNoteDto: UpdateNoteDto,
  ) {
    console.log('updateNoteDto');
  }
}
