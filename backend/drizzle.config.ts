import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/drizzle/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Append the timeout setting to your connection string
    url: `${process.env.DATABASE_URL}`,
    ssl: true,
  },
});
