import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get('/docs/')
  // getDocs(@Res() res: Response) {
  //   res.redirect('/docs');
  // }
}
