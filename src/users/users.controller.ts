import { Body, Controller, Post, Get } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenResponse } from './types/token.response';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.usersService.refreshToken(refreshTokenDto);
  }

  @Get('protected')
  protectedRoute() {
    return this.usersService.protected();
  }
}
