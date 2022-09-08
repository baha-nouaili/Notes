import { AuthenticationMiddleware } from './../shared/Auth/authentication.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UserSchema, { User } from './data/schema/user.schema';
import { UserRepository } from './data/users.repository';
import { JWT } from '../shared/Auth/jwt.helper';
import { RequestService } from '../shared/Auth/request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JWT, RequestService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'users/protected', method: RequestMethod.GET });
  }
}
