import apiClient from "@/api/apiClient";
import { useMutation } from "react-query";

type Event = {};

const createEvent = async ({
  eventData,
  token,
}: {
  eventData: Event;
  token: string | undefined;
}) => {
  const { data } = await apiClient(token).post("/events", eventData);
  return data;
};

export const useCreateEvent = () => {
  return useMutation(createEvent, {
    onSuccess: (eventData) => {
      console.log("on success", eventData);
      // invalidate query here
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
