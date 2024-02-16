// User database management
import type { UserJSON } from "@clerk/nextjs/server";
import { db } from "@db/db";
import { users, type User } from "@db/schema";
import { eq } from "drizzle-orm";

/**
 * Creates a new user with data from Clerk webhook.
 *
 * @param user A user object; should come from `evt.data` from the webhook.
 */
export async function createUser(user: UserJSON) {
  const userFullName =
    user.first_name && user.last_name
      ? user.first_name + " " + user.last_name
      : null;

  const createUserDTO: User = {
    id: user.id,
    email: user.email_addresses[0].email_address,
    fullName: userFullName,
    username: user.username ?? "FlyBy User",
  };

  await db.insert(users).values(createUserDTO);
}

/**
 * Update an existing user with data from Clerk webhook.
 *
 * @param user A user object; should come from `evt.data` from the webhook.
 */
export async function updateUser(user: UserJSON) {
  const userFullName =
    user.first_name || user.last_name
      ? [user.first_name, user.last_name].join(" ")
      : null;

  const updateUserDTO: Omit<User, "id"> = {
    email: user.email_addresses[0].email_address,
    fullName: userFullName,
    username: user.username ?? "FlyBy User",
  };

  await db.update(users).set(updateUserDTO).where(eq(users.id, user.id));
}

/**
 * Delete an existing user from database, using the id from Clerk webhook.
 *
 * @param user A user object; should come from `evt.data` from the webhook.
 */
export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}
