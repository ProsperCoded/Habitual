import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { DrizzleDB } from 'src/lib/types';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DRIZZLE_SYMBOL } from './drizzle.constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE_SYMBOL,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isDevEnv = configService.get('NODE_ENV') === 'development';
        const DB_URL = isDevEnv
          ? configService.get('DATABASE_URL_DEV')
          : configService.get('DATABASE_URL');
        console.log({ DB_URL });
        const pool = new Pool({
          connectionString: DB_URL,
          ssl: {
            rejectUnauthorized: false,
          },
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 30000,
          max: 10,
          allowExitOnIdle: false,
        });
        pool.on('error', async (error: any) => {
          if (error.code === '57P01') {
            console.log('reconnecting ...');
            await pool.connect();
          }
          console.log(error);
        });
        await pool.connect(); //this isn't needed because drizzle connects to the pool automatically
        return drizzle(pool, { schema }) as DrizzleDB;
      },
    },
    DrizzleService,
  ],
  exports: [DRIZZLE_SYMBOL],
})
export class DrizzleModule {}
export { DRIZZLE_SYMBOL };
