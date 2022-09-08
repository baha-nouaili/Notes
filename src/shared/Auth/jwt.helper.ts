import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Jwt, sign, verify, JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

@Injectable()
export class JWT {
  constructor(private configService: ConfigService) {}

  signAccessToken(userId: ObjectId): Promise<string> {
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

  signRefreshToken(userId: ObjectId): Promise<string> {
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

  verifyAccessToken(token: string): Jwt | JwtPayload | string {
    const accessTokenSecret = this.configService.get('ACCESS_TOKEN_SECRET');
    return new Promise((resolve, reject) => {
      verify(token, accessTokenSecret, (err, payload) => {
        if (err) reject(err);
        return resolve(payload);
      });
    });
  }
}
