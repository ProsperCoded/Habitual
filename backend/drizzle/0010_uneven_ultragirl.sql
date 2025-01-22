CREATE TABLE "executionLogs" (
	"userId" integer NOT NULL,
	"groupId" integer NOT NULL,
	"completionTime" timestamp NOT NULL,
	CONSTRAINT "executionLogs_pk" PRIMARY KEY("userId","groupId")
);
--> statement-breakpoint
ALTER TABLE "executionLogs" ADD CONSTRAINT "executionLogs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "executionLogs" ADD CONSTRAINT "executionLogs_groupId_habitGroup_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."habitGroup"("id") ON DELETE cascade ON UPDATE no action;