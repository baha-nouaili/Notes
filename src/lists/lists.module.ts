import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListRepository } from './data/list.repository';
import { List, ListSchema } from './data/schemas/list.schema';
import { AuthenticationMiddleware } from '../shared/Auth/authentication.middleware';
import { JWT } from '../shared/Auth/jwt.helper';
import { RequestService } from '../shared/Auth/request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  controllers: [ListsController],
  providers: [ListsService, ListRepository, JWT, RequestService],
})
export class ListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('list/*');
  }
}
