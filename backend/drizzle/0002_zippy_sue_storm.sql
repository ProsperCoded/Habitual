ALTER TABLE "habitGroup" ALTER COLUMN "startDate" SET DEFAULT '2024-12-31';--> statement-breakpoint
ALTER TABLE "habitGroup" ALTER COLUMN "startTime" SET DEFAULT '19:22:57';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";