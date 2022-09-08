import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
