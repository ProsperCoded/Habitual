import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import config from 'src/config/config';
import { ServerResponse, UserPayload } from 'src/lib/types';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';
import * as moment from 'moment';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ServerResponse<null>> {
    this.authService.logout(res);
    return { message: 'Logged out Successfully ', data: null };
  }
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserPayload;
    console.log({ user });
    const today = moment();
    const expiry = today.add(7, 'days');
    res.cookie('Authorization', user.token, {
      httpOnly: true,
      expires: expiry.toDate(),
    });
    const FRONTEND_URL = this.configService.frontEndUrl;
    const url = new URL(`auth/${user.id.toString()}`, FRONTEND_URL);
    // url.searchParams.append('id', user.id.toString());
    res.redirect(302, url.toString());
    // Todo: Store token as cookie and return the user
    // res.redirect(url.host);
  }
}
