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
      useFactory: async (configService: ConfigService) => {
        const DB_URL = configService.get('DATABASE_URL');
        console.log({ DB_URL });
        const pool = new Pool({
          connectionString: DB_URL,
          ssl: true,
          connectionTimeoutMillis: 50000,
          idleTimeoutMillis: 100000, // Adjust idle timeout
          max: 10, // Maximum connections in the pool
        });
        // await pool.connect(); //this isn't needed because drizzle connects to the pool automatically
        return drizzle(pool, { schema }) as DrizzleDB;
      },
    },
  ],
  exports: [DRIZZLE_SYMBOL],
})
export class DrizzleModule {}
