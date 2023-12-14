ALTER TABLE "comment" DROP CONSTRAINT "comment_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "eventGuests" DROP CONSTRAINT "eventGuests_user_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "event" DROP CONSTRAINT "event_host_id_user_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventGuests" ADD CONSTRAINT "eventGuests_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_host_id_user_user_id_fk" FOREIGN KEY ("host_id") REFERENCES "user"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
