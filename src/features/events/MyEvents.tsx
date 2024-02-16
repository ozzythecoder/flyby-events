import { currentUser } from "@clerk/nextjs";
import { getEventsByHost } from "@/data-services/event";

export async function MyEventsPage() {
  const user = await currentUser();

  if (!user) return <h1>ERROR</h1>;

  const { data, error } = await getEventsByHost(user.id);

  if (error !== null) return <h1>ERROR: {error}</h1>;

  return (
    <div className="text-primary-900">
      <h1 className="text-5xl">MY EVENTS</h1>
      {data.length > 0 ? (
        data.map((el) => (
          <div key={el.name}>
            <p>{el.name}</p>
            <p>{el.description}</p>
            <p>Created {JSON.stringify(el.createdAt)}</p>
          </div>
        ))
      ) : (
        <p>No events yet - let's make some plans!</p>
      )}
    </div>
  );
}
