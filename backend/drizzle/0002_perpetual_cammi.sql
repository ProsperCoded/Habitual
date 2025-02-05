ALTER TABLE "streaks" ALTER COLUMN "lastChecked" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "habitGroup" ADD COLUMN "timezone" text DEFAULT 'Africa/Lagos' NOT NULL;