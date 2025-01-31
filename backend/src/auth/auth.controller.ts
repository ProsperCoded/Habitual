import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Inject,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import config from 'src/config/config';
import { ServerResponse, UserPayload } from 'src/lib/types';
import { CookieOptions, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';
import * as moment from 'moment';
import { JWTGuard } from 'src/auth/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  @Post('logout')
  @UseGuards(JWTGuard)
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
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      expires: expiry.toDate(),
      sameSite: 'none',
      secure: false,
    };
    if (this.configService.isProduction === true) {
      cookieOptions['secure'] = true;
    }
    res.cookie('Authorization', user.token, cookieOptions);
    const FRONTEND_URL = this.configService.frontEndUrl;
    const url = new URL(`auth/${user.id.toString()}`, FRONTEND_URL);
    // url.searchParams.append('id', user.id.toString());
    res.redirect(302, url.toString());
    // Todo: Store token as cookie and return the user
    // res.redirect(url.host);
  }
  // ! Only for testing
  @Get('request-token/:id')
  generateToken(@Param('id') id: string) {
    return this.authService.generateToken(+id);
  }
}
