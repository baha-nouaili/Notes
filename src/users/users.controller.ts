import { Body, Controller, Post, Get } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenResponse } from './types/token.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<TokenResponse> {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto): Promise<TokenResponse> {
    return this.usersService.login(createUserDto);
  }

  @Get('protected')
  protectedRoute() {
    return this.usersService.protected();
  }
}
