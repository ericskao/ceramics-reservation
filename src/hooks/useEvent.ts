// import { getEvent } from "@/lib/events";
// import { useQuery } from "react-query";

export const useEvent = (id: string) => {
  let eventDetails = null;
  const savedEvents = localStorage?.getItem("savedEvents");
  if (savedEvents) {
    const parsedEvents = JSON.parse(savedEvents);
    eventDetails = parsedEvents.find(
      (event: { id: number }) => event?.id?.toString() == id,
    );
  }

  // return useQuery(["event", id], () => getEvent(id));
  return {
    eventDetails,
  };
};
