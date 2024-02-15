export const dynamic = "force-dynamic";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "./services";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const userId = evt.data.id;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${userId} and type of ${eventType}`);
  console.log("Webhook body:", body);

  try {
    switch (evt.type) {
      case "user.created":
        console.log("Creating user");
        await createUser(evt.data);
        break;
      case "user.updated":
        console.log("Updating user");
        await updateUser(evt.data);
        break;
      case "user.deleted":
        if (!userId) throw new Error("Bad request");
        console.log("Deleting user");
        await deleteUser(userId);
        break;
      default:
        throw new Error(
          `No valid data handling for event with type: ${eventType}`
        );
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.log(error);
    //TODO: Handle database error
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
