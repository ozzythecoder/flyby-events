"use server";

import { db } from "@db/index";
import { events } from "@db/schema";
import { currentUser } from "@clerk/nextjs";

export async function createEvent(formData: FormData) {
  const user = await currentUser();

  if (!user) throw new Error("Must be logged in to create event");

  // TODO: Server Actions, form data, type validation?
  await db.insert(events).values({
    name: "Lorem",
    description:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    hostId: user.id,
  });
}
