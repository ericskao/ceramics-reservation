// import { getEvent } from "@/lib/events";

import apiClient from "@/api/apiClient";
import { useQuery } from "react-query";

// export const useEvent = (id: string) => {
//   let eventDetails = null;
//   const savedEvents = localStorage?.getItem("savedEvents");
//   if (savedEvents) {
//     const parsedEvents = JSON.parse(savedEvents);
//     eventDetails = parsedEvents.find(
//       (event: { id: number }) => event?.id?.toString() == id,
//     );
//   }
//   return {
//     eventDetails,
//   };
// };

export const useEvent = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery("event", async () => {
    return await apiClient.get(`/events/${id}`);
  });
  return {
    event: data?.data?.event?.data?.attributes,
    availabilities: data?.data?.availabilities_by_user,
    guests: data?.data?.event?.data?.relationships,
    isLoading,
  };
};
