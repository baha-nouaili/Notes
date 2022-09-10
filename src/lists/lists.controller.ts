import { isAuthorGuard } from './guards/isAuthor.guard';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { List } from './data/schemas/list.schema';
import { InviteContributorDto } from './dto/invite-contributor.dto';
import { ListParamDto } from './dto/listIdParam.dto';
import { RequestService } from '../shared/Auth/request.service';

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
  @Post('invite-user/:listId')
  inviteUser(
    @Param() { listId }: ListParamDto,
    @Body() inviteContributorDto: InviteContributorDto,
  ): Promise<List> {
    const author = this.requestService.getUserId();
    return this.listsService.inviteUser(listId, author, inviteContributorDto);
  }
}
