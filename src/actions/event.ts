"use server";

import { db } from "@db/index";
import { events } from "@db/schema";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";
import { PostgresError } from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EventSchema = z.object({
  name: z.string().max(256),
  private: z.boolean().default(false),
  location: z.string().max(256),
  description: z.string().max(3000),
  timestamp: z.string().datetime(),
  ticketLink: z.string().max(256).optional(),
  id: z.string(),
  hostId: z.string(),
  createdAt: z.string(),
})

const CreateEventSchema = EventSchema.omit({ id: true, hostId: true, createdAt: true })

export async function createEvent(formData: FormData) {
  const user = await currentUser();

  if (!user) throw new Error("Must be logged in to create event");

  const validatedFields = CreateEventSchema
    .safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { data } = validatedFields;

  console.log(JSON.stringify(data, null, 4));

  try {
    const [{ eventId }] = await db.insert(events).values({
      hostId: user.id,
      name: data.name,
      private: data.private,
      location: data.location,
      description: data.description,
      timestamp: data.timestamp,
      ticketLink: data.ticketLink ?? null,
    }).returning({ eventId: events.id })

    revalidatePath('/event')
    redirect(`/event/${eventId}`)

  } catch (error) {
    console.error("Error creating event:", error)

    if (error instanceof PostgresError) {
      return {
        message: "Database error."
      }
    } else {
      return {
        message: "Something went wrong!"
      }
    }
  };

  // TODO: Server Actions, form data, type validation?
}
