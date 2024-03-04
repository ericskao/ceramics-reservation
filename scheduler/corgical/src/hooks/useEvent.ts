import { getEvent } from "@/lib/events";
import { useQuery } from "react-query";

export function useEvent(id: string) {
  return useQuery(["event", id], () => getEvent(id));
}
