ALTER TABLE "executionLogs" DROP CONSTRAINT "executionLogs_pk";--> statement-breakpoint
ALTER TABLE "executionLogs" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
CREATE INDEX "executionLogs_user_group_idx" ON "executionLogs" USING btree ("userId","groupId");