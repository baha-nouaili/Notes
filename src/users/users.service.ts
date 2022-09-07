import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from './data/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async register(userDto: CreateUserDto): Promise<string> {
    const { email, password } = userDto;
    const doesUserExist = await this.userRepository.findOne({ email });
    if (doesUserExist)
      throw new HttpException(
        'User already exist try to login.',
        HttpStatus.BAD_REQUEST,
      );
    await this.userRepository.create({ email, password });
    return 'Successfully registered!';
  }

  async login(userDto: CreateUserDto): Promise<string> {
    const { email, password } = userDto;
    const user = await this.userRepository.findOne({ email });
    if (!user || !(await user.isValidPassword(password)))
      throw new HttpException(
        'Invalid email & password.',
        HttpStatus.NOT_FOUND,
      );
    return 'You are logged in.';
  }
}
