import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import config from 'src/config/config';
import { JWT_IDENTIFIER } from 'src/config/jwt.config';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    @Inject(JWT_IDENTIFIER) private readonly jwtService: JwtService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    console.log('cookies', request.cookies);

    let token = request.cookies.Authorization;
    // check Authorization header
    if (!token) {
      const authHeader = request.headers.authorization;
      token = authHeader?.split(' ')[1];
    }
    if (!token) {
      console.error('JWT token is missing in cookies or Authorization header');
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);
      console.log({ decoded });
      request.user = { id: decoded.sub };
      // ! for testing purposes
      // if (!decoded?.sub && this.configService.isProduction === false) {
      //   request.user = { id: 1 };
      //   return true;
      // }
      return !!decoded;
    } catch (error) {
      console.error('Error verifying JWT token:', error.message);
      return false;
    }
  }
}
