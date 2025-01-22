ALTER TABLE "habitGroup" ALTER COLUMN "startDate" SET DEFAULT CURRENT_DATE;--> statement-breakpoint
ALTER TABLE "habitGroup" ADD COLUMN "time" time DEFAULT CURRENT_TIME NOT NULL;