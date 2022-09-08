import { RequestService } from './../shared/Auth/request.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from './data/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JWT } from '../shared/Auth/jwt.helper';
import { TokenResponse } from './types/token.response';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JWT,
    private requestService: RequestService,
  ) {}

  async register(userDto: CreateUserDto): Promise<TokenResponse> {
    const { email, password } = userDto;
    const doesUserExist = await this.userRepository.findOne({ email });
    if (doesUserExist)
      throw new HttpException(
        'User already exist try to login.',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userRepository.create({ email, password });
    const accessToken = await this.jwtService.signAccessToken(user._id);
    const refreshToken = await this.jwtService.signRefreshToken(user._id);
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(userDto: CreateUserDto): Promise<TokenResponse> {
    const { email, password } = userDto;
    const user = await this.userRepository.findOne({ email });
    if (!user || !(await user.isValidPassword(password)))
      throw new HttpException(
        'Invalid email & password.',
        HttpStatus.NOT_FOUND,
      );
    const accessToken = await this.jwtService.signAccessToken(user._id);
    const refreshToken = await this.jwtService.signRefreshToken(user._id);
    return {
      accessToken,
      refreshToken,
    };
  }

  async protected() {
    try {
      const user = this.requestService.getUserId();
      console.log(user);
      return 'hello ';
    } catch (error) {
      console.log('error', error);
    }
  }
}
