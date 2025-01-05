import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { FRONTEND_URL } from 'src/config/config';
import { ServerResponse, UserPayload } from 'src/lib/types';
import { Request, Response } from 'express';
import { JWTGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserPayload;
    console.log({ user });
    res.cookie('Authorization', user.token, { httpOnly: true });
    const url = new URL(`auth/${user.id.toString()}`, FRONTEND_URL);
    // url.searchParams.append('id', user.id.toString());
    res.redirect(302, url.toString());
    // Todo: Store token as cookie and return the user
    // res.redirect(url.host);
  }
}
