import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListRepository } from './data/list.repository';
import { List, ListSchema } from './data/schemas/list.schema';
import { AuthenticationMiddleware } from '../users/middleware/authentication.middleware';
import { JWT } from '../shared/Auth/jwt.helper';
import { RequestService } from '../shared/Auth/request.service';
import { UsersModule } from '../users/users.module';
import { AuthorizationService } from './services/authorization.service';
import { Note, NoteSchema } from './data/schemas/note.schema';
import { NoteRepository } from './data/note.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    UsersModule,
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListRepository,
    JWT,
    RequestService,
    AuthorizationService,
    NoteRepository,
  ],
})
export class ListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('lists/*');
  }
}
