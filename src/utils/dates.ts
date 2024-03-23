import {
  ChunkedTimesType,
  ConfirmedTimeType,
} from "@/components/features/EventForm.types";
import { formatISO } from "date-fns";

export function chunkDates(dates: ConfirmedTimeType[]): {
  [key: string]: ConfirmedTimeType[];
} {
  return dates.reduce((acc: ChunkedTimesType, curr) => {
    const isoDateString = formatISO(curr.date);
    if (!acc[isoDateString]) {
      acc[isoDateString] = [curr];
    } else {
      acc[isoDateString].push(curr);
    }
    return acc;
  }, {});
}
