import {Controller, Post, Body, HttpException, HttpStatus, Res, Get, UseGuards} from '@nestjs/common';
import {ApiCookieAuth, ApiOperation, ApiProperty, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { AuthService } from './services/auth/auth.service';
import { Response } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {JwtRefreshGuard} from "./auth/guards/jwt-refresh.guard";
import {JwtGuard} from "./auth/guards/jwt.guard";

export const ReqUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      return req.user;
    },
);

class AuthDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}

@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Неправильно введён логин или пароль' })
  public async login(@Body() authData: AuthDto, @Res() response: Response) {
    const user = await this.authService.validateUser(authData.userName, authData.password);

    if (!user) {
      throw new HttpException('Неправильно введён логин или пароль', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this._setAuthHeaders(response, user.id);
    response.json({ access_token: accessToken });
  }

  @Post('logout')
  @ApiCookieAuth()
  @UseGuards(JwtGuard)
  async logout(@Res() response: Response) {
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
    response.sendStatus(HttpStatus.OK);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Обновляет токен доступа'
  })
  async refreshToken(@ReqUser() user: any, @Res() response: Response) {
    const accessToken = await this._setAuthHeaders(response, user.id);
    response.json({ access_token: accessToken });
  }

  private async _setAuthHeaders(res: Response, userId: string): Promise<string> {
    const accessTokenData = this.authService.getCookieWithJwtAccessToken(userId);
    const refreshTokenData = this.authService.getCookieWithJwtRefreshToken(userId);

    res.setHeader('Set-Cookie', [
      accessTokenData.cookie,
      refreshTokenData.cookie,
    ]);

    return accessTokenData.token;
  }

}
