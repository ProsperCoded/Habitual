ALTER TABLE "groupMembers" DROP CONSTRAINT "groupMembers_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "groupMembers" DROP CONSTRAINT "groupMembers_groupId_habitGroup_id_fk";
--> statement-breakpoint
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_groupId_habitGroup_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."habitGroup"("id") ON DELETE cascade ON UPDATE no action;