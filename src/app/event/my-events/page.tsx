import { MyEventsPage } from "@/features/events";
import { Suspense } from "react";

export default function MyEvents() {
  return (
    <Suspense fallback={<h1 className="text-4xl text-text">Loading...</h1>}>
      <MyEventsPage />
    </Suspense>
  );
}
