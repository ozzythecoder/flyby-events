ALTER TABLE "user" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;