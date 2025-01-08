import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE_SYMBOL } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/lib/types';
import { user } from 'src/drizzle/schema/users.schema';
import { UserNotFoundException } from 'src/lib/Exceptions/UserExceptions';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE_SYMBOL) private db: DrizzleDB) {}
  async create(createUserDto: CreateUserDto) {
    const createdUsers = await this.db
      .insert(user)
      .values([createUserDto])
      .returning();
    return createdUsers[0];
  }

  async findAll() {
    // return this.db.select().from(users).execute();
    return this.db.query.user.findMany({
      with: {
        activeHabits: true,
        createdHabit: {
          with: {
            activeUsers: true,
          },
        },
      },
    });
  }
  async findByEmail(email: string) {
    return this.db.query.user.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }

  findOne(id: string) {
    const user = this.db.query.user.findFirst({
      where: (users, { eq }) => eq(users.id, parseInt(id)),
    });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
