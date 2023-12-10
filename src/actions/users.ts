"use server";

import { db } from "@db/index"
import { users } from "@db/schema";
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm";

export async function createUser() {

  const clerkUser = await currentUser();
  if (!clerkUser) return;

  const doesUserExist = await db.select().from(users).where(eq(users.id, clerkUser.id))
  if (doesUserExist.length !== 0) return;

  const newUser = await db.insert(users).values({
    id: clerkUser.id,
    username: clerkUser.username ?? clerkUser.firstName ?? clerkUser.id
  })

}

