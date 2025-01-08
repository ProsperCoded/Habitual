import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import jwtConfig, { JWT_IDENTIFIER } from 'src/config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/lib/types';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    @Inject(JWT_IDENTIFIER) private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfigurations: ConfigType<typeof jwtConfig>,
  ) {}
  logout(res: Response) {
    res.cookie('Authorization', '', { httpOnly: true });
  }
  // Signup the user
  private async login(user: CreateUserDto): Promise<UserPayload> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (!existingUser) {
      console.error('User does not exist');
      throw new BadRequestException('User does not exist');
    }
    const token = await this.jwtService.signAsync({ sub: existingUser.id });
    const payload = { id: existingUser.id.toString(), token };
    return payload;
  }
  private async signup(user: CreateUserDto): Promise<UserPayload> {
    const createdUser = await this.usersService.create(user);

    const token = await this.jwtService.signAsync({ sub: createdUser.id });
    const payload = { id: createdUser.id.toString(), token };
    return payload;
  }

  // process user signup/login after accepting google consent page
  async validateGoogleOAuthUser(user: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      console.error('User already exists');
      return this.login(user);
    }
    return this.signup(user);
  }
}
