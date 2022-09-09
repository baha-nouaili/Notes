import { Controller } from '@nestjs/common';
import { ListsService } from './lists.service';

@Controller('list')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
}
