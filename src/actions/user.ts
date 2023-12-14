"use server";

import { db } from "@db/index";
import { users } from "@db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  fullName: z.string().or(z.null()),
  username: z.string(),
})

export async function createUser() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return;

    const userAlreadyExists = (await db
      .select()
      .from(users)
      .where(eq(users.id, clerkUser.id)))
      .length > 0;
    if (userAlreadyExists) {
      return {
        message: 'User already exists.'
      }
    };

    await db.insert(users).values({
      id: clerkUser.id,
      username: clerkUser.username ?? clerkUser.firstName ?? "FlyBy User",
    });

    revalidatePath('/');
  } catch (error) {
    console.error(error)
    if (error instanceof PostgresError) {
      return {
        message: 'Database error. Try again later.'
      }
    }
    return {
      message: 'Something went wrong.'
    }
  }
}