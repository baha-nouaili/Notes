import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.usersService.login(createUserDto);
  }
}
