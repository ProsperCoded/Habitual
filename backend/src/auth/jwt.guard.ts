import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWT_IDENTIFIER } from 'src/config/jwt.config';
@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    @Inject(JWT_IDENTIFIER) private readonly jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const decoded = this.jwtService.decode(request.cookies.Authorization);
    if (!decoded) return false;
    request.user = { id: decoded.sub };
    return !!decoded;
  }
}
