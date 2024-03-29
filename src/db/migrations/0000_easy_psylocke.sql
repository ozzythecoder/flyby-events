DO $$ BEGIN
 CREATE TYPE "guest_state" AS ENUM('none', 'going', 'not going', 'maybe');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"author_id" text NOT NULL,
	"reply_to_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"body" varchar(3000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventGuests" (
	"user_id" text NOT NULL,
	"event_id" uuid NOT NULL,
	"guest_state" "guest_state" DEFAULT 'none',
	"invitation_read" boolean DEFAULT false,
	CONSTRAINT "eventGuests_user_id_event_id_unique" UNIQUE("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"private" boolean DEFAULT false,
	"location" varchar(256),
	"description" varchar(3000),
	"timestamp" timestamp with time zone NOT NULL,
	"ticket_link" varchar(256),
	"host_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"user_id" text PRIMARY KEY NOT NULL,
	"full_name" varchar(256),
	"username" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_author_id_auth_user_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "auth_user"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_reply_to_id_comment_id_fk" FOREIGN KEY ("reply_to_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventGuests" ADD CONSTRAINT "eventGuests_user_id_auth_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventGuests" ADD CONSTRAINT "eventGuests_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_host_id_auth_user_user_id_fk" FOREIGN KEY ("host_id") REFERENCES "auth_user"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
