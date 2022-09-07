import { Injectable } from '@nestjs/common';
import { UserRepository } from './data/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
}
