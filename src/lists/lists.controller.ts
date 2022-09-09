import { Controller, Post } from '@nestjs/common';
import { ListsService } from './lists.service';
import { List } from './data/schemas/list.schema';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  createNoteList(): Promise<List> {
    return this.listsService.createNoteList();
  }
}
