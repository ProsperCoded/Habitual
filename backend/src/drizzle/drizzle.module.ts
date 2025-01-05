import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { DrizzleDB } from 'src/lib/types';
export const DRIZZLE_SYMBOL = Symbol('Drizzle');
@Module({
  providers: [
    {
      provide: DRIZZLE_SYMBOL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const DB_URL = configService.get('DATABASE_URL');
        const pool = new Pool({
          connectionString: DB_URL,
          ssl: true, //todo: remove this line if you are not using heroku,
        });
        return drizzle(pool, { schema }) as DrizzleDB;
      },
    },
  ],
  exports: [DRIZZLE_SYMBOL],
})
export class DrizzleModule {}
