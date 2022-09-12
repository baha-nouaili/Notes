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
  Get,
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
import { isAuthorOrContributor } from './guards/isAuthorOrContributor.guard';
import { UserIdParam } from './dto/userIdParam.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('lists')
@ApiBearerAuth('access-token')
@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private readonly requestService: RequestService,
  ) {}

  @ApiCreatedResponse({ type: List })
  @Post('create-list')
  createNoteList(): Promise<List> {
    const author = this.requestService.getUserId();
    return this.listsService.createNoteList(author);
  }

  @ApiCreatedResponse({ type: List })
  @UseGuards(isAuthorGuard)
  @Post(':listId/invite-user')
  inviteUser(
    @Param() { listId }: ListParamDto,
    @Body() inviteContributorDto: InviteContributorDto,
  ): Promise<List> {
    const author = this.requestService.getUserId();
    return this.listsService.inviteUser(listId, author, inviteContributorDto);
  }

  @ApiCreatedResponse({ type: Note })
  @UseGuards(isAuthorOrReadAndWriteCont)
  @Post(':listId/add-note')
  addNote(
    @Param() { listId }: ListParamDto,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const author = this.requestService.getUserId();
    return this.listsService.createNote(listId, author, createNoteDto);
  }

  @ApiCreatedResponse({ type: String })
  @UseGuards(isAuthorOrReadAndWriteCont)
  @Delete(':listId/:noteId/delete-note')
  deleteNote(
    @Param() { listId }: ListParamDto,
    @Param() { noteId }: NoteParamDto,
  ): Promise<string> {
    const userId = this.requestService.getUserId();
    console.log('here');
    return this.listsService.deleteNote(listId, userId, noteId);
  }

  @ApiCreatedResponse({ type: Note })
  @UseGuards(isAuthorOrReadAndWriteCont)
  @Put(':listId/:noteId')
  updateNote(
    @Param() { listId }: ListParamDto,
    @Param() { noteId }: NoteParamDto,
    @Body(new NoteUpdateValidate()) updateNoteDto: UpdateNoteDto,
  ) {
    const author = this.requestService.getUserId();
    return this.listsService.updateNote(noteId, listId, author, updateNoteDto);
  }

  @ApiCreatedResponse({ type: Note })
  @UseGuards(isAuthorOrContributor)
  @Get(':listId/notes')
  getNotes(@Param() { listId }: ListParamDto): Promise<Note[] | []> {
    return this.listsService.getNotes(listId);
  }

  @ApiCreatedResponse({ type: List })
  @UseGuards(isAuthorGuard)
  @Put(':listId/update-permission/:userId')
  updateContributorPermission(
    @Param() { listId }: ListParamDto,
    @Param() { userId }: UserIdParam,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const author = this.requestService.getUserId();
    return this.listsService.updatePermission(
      listId,
      author,
      userId,
      updatePermissionDto,
    );
  }

  @ApiCreatedResponse({ type: String })
  @UseGuards(isAuthorGuard)
  @Delete(':listId/delete/:userId')
  deleteContributor(
    @Param() { listId }: ListParamDto,
    @Param() { userId }: UserIdParam,
  ) {
    const authorId = this.requestService.getUserId();
    return this.listsService.deleteContributor(listId, authorId, userId);
  }
}
