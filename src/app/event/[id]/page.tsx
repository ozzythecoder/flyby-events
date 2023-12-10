import { getEvent } from "@/data-access/events";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await getEvent(params.id);

  if (error)
    return (
      <div>
        <h1>ERROR</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl">Hello</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
