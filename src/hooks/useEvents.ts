import apiClient from "@/api/apiClient";
import { useQuery } from "react-query";

export const useEvents = () => {
  const { data } = useQuery("events", async () => {
    const { data } = await apiClient.get("/events");
    return data;
  });
  console.log("data", data);
  const upcomingHostedEvents = data?.upcoming_events?.data || [];
  const upcomingParticipatingEvents =
    data?.upcoming_participating_events?.data || [];
  const pastEvents = data?.closed_events?.data || [];
  console.log(upcomingHostedEvents, upcomingParticipatingEvents);
  return {
    upcomingHostedEvents,
    upcomingParticipatingEvents,
    pastEvents,
  };
};
