ALTER TABLE "event" ADD COLUMN "timestamp" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "ticket_link" varchar;