import apiClient from "@/api/apiClient";
import { useQuery } from "react-query";
import { useUser } from "./useUser";

export const useEvents = () => {
  const { userId, token } = useUser();
  const { data } = useQuery(
    "events",
    async () => {
      const { data } = await apiClient(token).get("/events");
      return data;
    },
    { enabled: !!userId },
  );

  const upcomingHostedEvents = data?.upcoming_events?.data || [];
  const upcomingParticipatingEvents =
    data?.upcoming_participating_events?.data || [];
  const pastEvents = data?.closed_events?.data || [];

  return {
    upcomingHostedEvents,
    upcomingParticipatingEvents,
    pastEvents,
  };
};
