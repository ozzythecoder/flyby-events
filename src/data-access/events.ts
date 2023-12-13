import { db } from "@db/index";
import { events, type Event } from "@db/schema";
import { eq } from "drizzle-orm";

export async function getEvent(
  eventId: string
): Promise<{ data: Event[]; error: null } | { data: null; error: any }> {
  try {
    const data = await db.select().from(events).where(eq(events.id, eventId));

    return {
      data,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
}

export async function getEventsByHost(
  hostId: string
): Promise<{ data: Event[]; error: null } | { data: null; error: any }> {
  try {
    const data = await db
      .select()
      .from(events)
      .where(eq(events.hostId, hostId));

    return {
      data,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
}
