import { getEvents } from "@/data-services/event";

export async function GET(request: Request) {
  const body = await request.json();
  const data = await getEvents(body.user.id);
  return Response.json(data);
}
