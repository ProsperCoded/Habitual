import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { ServerResponse } from 'src/lib/types';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/profile')
  @UseGuards(JWTGuard)
  async profile(@Req() req: Request): Promise<ServerResponse<UserEntity>> {
    const { id } = req.user as { id: string };
    const user = await this.userService.findOne(id);
    let message = 'Successfully Fetched Profile User';
    return { data: user, message };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
