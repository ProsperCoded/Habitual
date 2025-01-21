ALTER TABLE "habitGroup" ALTER COLUMN "startDate" SET DEFAULT '2025-01-20';--> statement-breakpoint
ALTER TABLE "habits" DROP COLUMN "habitState";--> statement-breakpoint
DROP TYPE "public"."habitState";