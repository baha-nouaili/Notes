import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenResponse } from './types/token.response';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: TokenResponse })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<TokenResponse> {
    return this.usersService.register(createUserDto);
  }

  @ApiCreatedResponse({ type: TokenResponse })
  @Post('login')
  login(@Body() createUserDto: CreateUserDto): Promise<TokenResponse> {
    return this.usersService.login(createUserDto);
  }

  @ApiCreatedResponse({ type: TokenResponse })
  @Post('refresh-token')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponse> {
    return this.usersService.refreshToken(refreshTokenDto);
  }
}
