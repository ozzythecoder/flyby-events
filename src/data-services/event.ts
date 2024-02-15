import { db } from "@db/db";
import { Event, eventGuests, events } from "@db/schema";
import { eq } from "drizzle-orm";

export type CreateEventDTO = Omit<Event, "id" | "createdAt">;

export async function postEvent(createEventDTO: CreateEventDTO) {
  const [{ eventId }] = await db
    .insert(events)
    .values(createEventDTO)
    .returning({ eventId: events.id });

  return eventId;
}

export async function getEvents(userId: string) {
  const response = await db
    .select()
    .from(events)
    .where(eq(events.hostId, userId))
    .innerJoin(eventGuests, eq(eventGuests.userId, userId));

  return response;
}

export async function getEventById(eventId: string) {
  const response = await db.select().from(events).where(eq(events.id, eventId));
  return response;
}

export async function getEventsByHost(userId: string) {
  const response = await db
    .select()
    .from(events)
    .where(eq(events.hostId, userId));

  return response;
}
