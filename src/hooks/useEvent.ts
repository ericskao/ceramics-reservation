// import { getEvent } from "@/lib/events";
// import { useQuery } from "react-query";

export function useEvent(id: string) {
  // using local storage
  if (typeof localStorage !== "undefined") {
    const savedEvents = localStorage.getItem("savedEvents");
    if (!savedEvents) {
      return null;
    }
    const parsedEvents = JSON.parse(savedEvents);
    return parsedEvents.find(
      (event: { id: number }) => event?.id?.toString() == id,
    );
  }
  // return useQuery(["event", id], () => getEvent(id));
}
