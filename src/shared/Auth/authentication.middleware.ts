import {
  NestMiddleware,
  UnauthorizedException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JWT } from './jwt.helper';
import { RequestService } from './request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JWT,
    private readonly requestService: RequestService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const headersAuth = req.headers.authorization;
      if (!headersAuth) throw new UnauthorizedException();
      const token = headersAuth.split(' ')[1];
      if (!token) throw new UnauthorizedException();
      const { sub } = await this.jwtService.verifyAccessToken(token);
      this.requestService.setUserId(sub);
      next();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
