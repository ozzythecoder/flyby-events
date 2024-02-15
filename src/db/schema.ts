import {
  type AnyPgColumn,
  varchar,
  unique,
  text,
  timestamp,
  boolean,
  pgEnum,
  pgTable,
  uuid,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";

export const guestStatusEnum = pgEnum("guest_state", [
  "none",
  "going",
  "not going",
  "maybe",
]);

export const users = pgTable("auth_user", {
  id: text("user_id").primaryKey(), // corresponds to userId in clerk
  fullName: varchar("full_name", { length: 256 }),
  username: varchar("username", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
});

export const usersRelation = relations(users, ({ many }) => ({
  eventGuests: many(eventGuests),
  events: many(events),
}));

// Postgres Resource on timestamps:
// https://www.postgresql.org/docs/current/datatype-datetime.html

export const events = pgTable("event", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  private: boolean("private").default(false),
  location: varchar("location", { length: 256 }),
  description: varchar("description", { length: 3000 }),
  timestamp: timestamp("timestamp", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  ticketLink: varchar("ticket_link", { length: 256 }),
  hostId: text("host_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
});

export const eventsRelation = relations(events, ({ one, many }) => ({
  host: one(users, { fields: [events.hostId], references: [users.id] }),
  eventGuests: many(eventGuests),
  comments: many(comments),
}));

export const comments = pgTable("comment", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade", onUpdate: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  replyToId: uuid("reply_to_id").references((): AnyPgColumn => comments.id, {
    onDelete: "no action",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  body: varchar("body", { length: 3000 }).notNull(),
});

export const commentsRelation = relations(comments, ({ one }) => ({
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
  event: one(events, { fields: [comments.eventId], references: [events.id] }),
  replyTo: one(comments, {
    fields: [comments.replyToId],
    references: [comments.id],
  }),
}));

export const eventGuests = pgTable(
  "eventGuests",
  {
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    eventId: uuid("event_id")
      .references(() => events.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    guestStatus: guestStatusEnum("guest_state").default("none"),
    invitationRead: boolean("invitation_read").default(false),
  },
  (t) => ({
    unq: unique().on(t.userId, t.eventId),
  })
);

export const eventGuestsRelation = relations(eventGuests, ({ one }) => ({
  event: one(events, {
    fields: [eventGuests.eventId],
    references: [events.id],
  }),
  user: one(users, { fields: [eventGuests.userId], references: [users.id] }),
}));

export type User = InferSelectModel<typeof users>;
export type Event = InferSelectModel<typeof events>;
