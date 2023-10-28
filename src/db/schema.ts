import { serial, integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: text('name').notNull()
})
