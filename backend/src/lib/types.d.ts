import * as schema from '../drizzle/schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { executionLogs } from '../drizzle/schema/schema';

export type DrizzleDB = NodePgDatabase<typeof schema>;

export type UserPayload = {
  id: string;
  token: string;
};

export type ServerResponse<T> = {
  message: string;
  data: T;
  error?: string | null;
};
export type ExecutionLogsEntity = InferSelectModel<typeof executionLogs>;
