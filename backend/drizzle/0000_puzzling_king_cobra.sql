CREATE TYPE "public"."groupState" AS ENUM('private', 'public');--> statement-breakpoint
CREATE TABLE "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"creatorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habitActiveUsers" (
	"habitId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "habitActiveUsers_pk" PRIMARY KEY("habitId","userId")
);
--> statement-breakpoint
CREATE TABLE "groupMembers" (
	"userId" integer NOT NULL,
	"groupId" integer NOT NULL,
	CONSTRAINT "groupMembers_pk" PRIMARY KEY("userId","groupId")
);
--> statement-breakpoint
CREATE TABLE "habitGroup" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"groupState" "groupState" NOT NULL,
	"habitId" integer,
	"startDate" date DEFAULT CURRENT_DATE NOT NULL,
	"time" time DEFAULT CURRENT_TIME NOT NULL,
	"tolerance" integer DEFAULT 0 NOT NULL,
	"interval" interval DEFAULT '1 day' NOT NULL,
	"creatorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "executionLogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"groupId" integer NOT NULL,
	"completionTime" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitActiveUsers" ADD CONSTRAINT "habitActiveUsers_habitId_habits_id_fk" FOREIGN KEY ("habitId") REFERENCES "public"."habits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitActiveUsers" ADD CONSTRAINT "habitActiveUsers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_groupId_habitGroup_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."habitGroup"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitGroup" ADD CONSTRAINT "habitGroup_habitId_habits_id_fk" FOREIGN KEY ("habitId") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitGroup" ADD CONSTRAINT "habitGroup_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "executionLogs" ADD CONSTRAINT "executionLogs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "executionLogs" ADD CONSTRAINT "executionLogs_groupId_habitGroup_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."habitGroup"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "userIdIndex" ON "habitActiveUsers" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "executionLogs_user_group_idx" ON "executionLogs" USING btree ("userId","groupId");