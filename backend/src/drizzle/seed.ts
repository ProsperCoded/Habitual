import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import { faker } from '@faker-js/faker';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
async function main() {
  // const userIds = await Promise.all(
  //   Array(50)
  //     .fill(0)
  //     .map(async (_, i) => {
  //       const user = await db
  //         .insert(schema.users)
  //         .values({
  //           firstName: faker.person.firstName(),
  //           lastName: faker.person.lastName(),
  //           email: faker.internet.email(),
  //           password: faker.internet.password(),
  //         })
  //         .returning();
  //       return user[0].id;
  //     }),
  // );
  const habitids = await Promise.all(
    Array(20)
      .fill(0)
      .map(async (_, i) => {
        const habit = await db
          .insert(schema.habit)
          .values({
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
            creatorId: i + 1,
            habitState: 'public',
          })
          .returning();
        return habit[0].id;
      }),
  );
}
main()
  .catch(console.error)
  .finally(() => pool.end());
