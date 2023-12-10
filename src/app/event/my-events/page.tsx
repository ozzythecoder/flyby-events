import { currentUser } from "@clerk/nextjs";
import { getEventsByHost } from "@/data-access/events";

export default async function MyEventsPage() {
  const user = await currentUser();

  if (!user) return <h1>ERROR</h1>;

  const { data, error } = await getEventsByHost(user.id);

  if (error !== null) return <h1>ERROR: {JSON.stringify(error)}</h1>;

  return (
    <div>
      <h1>MY EVENTS</h1>
      {data?.map((el, idx) => (
        <div key={idx}>
          <p>{el.name}</p>
          <p>{el.description}</p>
          <p>Created {JSON.stringify(el.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
