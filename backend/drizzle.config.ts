import 'dotenv/config';

import { Config, defineConfig } from 'drizzle-kit';
const options: Config = {
  schema: './src/drizzle/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Append the timeout setting to your connection string
    url: `${process.env.DATABASE_URL_DEV}`,
    ssl: true,
  },
};
console.log(options);
export default defineConfig(options);
