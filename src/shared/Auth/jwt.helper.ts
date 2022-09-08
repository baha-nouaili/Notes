import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

@Injectable()
export class JWT {
  constructor(private configService: ConfigService) {}

  signAccessToken(userId: ObjectId | string): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        sub: userId,
      };
      const secret = this.configService.get('ACCESS_TOKEN_SECRET');
      const exp_date = this.configService.get('ACCESS_TOKEN_EXP');
      const options = { expiresIn: exp_date };
      sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  signRefreshToken(userId: ObjectId | string): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        sub: userId,
      };
      const secret = this.configService.get('REFRESH_TOKEN_SECRET');
      const exp_date = this.configService.get('REFRESH_TOKEN_EXP');
      const options = { expiresIn: exp_date };
      sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  verifyAccessToken(token: string): Promise<JwtPayload> {
    const accessTokenSecret = this.configService.get('ACCESS_TOKEN_SECRET');
    return new Promise((resolve, _) => {
      verify(token, accessTokenSecret, (err: any, payload: JwtPayload) => {
        if (err) {
          if (err.name === 'JsonWebTokenError') {
            throw new UnauthorizedException();
          } else {
            throw new UnauthorizedException(err.message);
          }
        }
        resolve(payload);
      });
    });
  }

  verifyRefreshToken(refreshToken: string): Promise<string> {
    const refreshTokenSecret = this.configService.get('REFRESH_TOKEN_SECRET');
    return new Promise((resolve, _) => {
      verify(refreshToken, refreshTokenSecret, (err, payload: JwtPayload) => {
        if (err) throw new UnauthorizedException();
        const { sub } = payload;
        resolve(sub);
      });
    });
  }
}
