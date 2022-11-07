import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET
} from "../../shared/constants";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: JWT_REFRESH_TOKEN_SECRET
      });
    } catch (e) {
      return null;
    }
  }

  getCookieWithJwtAccessToken(userId: string) {
    const token = this.jwtService.sign({ userId }, {
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
    return { cookie, token };
  }

  getCookieWithJwtRefreshToken(userId: string) {
    const token = this.jwtService.sign({ userId }, {
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
    return { cookie, token };
  }
}