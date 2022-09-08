import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UserSchema, { User } from './data/schema/user.schema';
import { UserRepository } from './data/users.repository';
import { JWT } from '../shared/Auth/jwt.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JWT],
})
export class UsersModule {}
