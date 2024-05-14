const { addDays, startOfWeek } = require("date-fns");
import apiClient from "@/api/apiClient";
import { useQuery } from "react-query";

export type ReservationType = {
  date: string;
  wheel_number: number;
  user_id: string;
  starting_time: number;
  id: number;
};

export const useReservations = () => {
  const { data } = useQuery("reservations", async () => {
    const { data } = await apiClient().get("/reservations");
    return data;
  });
  const reservations: ReservationType[] = data?.reservations || [];

  const currentDate = new Date();
  const fridayDate =
    currentDate.getDay() === 0
      ? addDays(startOfWeek(currentDate), 5)
      : addDays(currentDate, (5 - currentDate.getDay() + 7) % 7);

  const [fridayReservations, saturdayReservations]: [
    ReservationType[],
    ReservationType[],
  ] = [[], []];

  let fridayDateObj = new Date(fridayDate);
  fridayDateObj.setHours(0, 0, 0, 0);
  const fridayDateString = fridayDateObj.toISOString();
  const saturdayDay = addDays(fridayDate, 1);
  saturdayDay.setHours(0, 0, 0, 0);
  const saturdayDateString = saturdayDay.toISOString();

  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].date === fridayDateString) {
      fridayReservations.push(reservations[i]);
    } else if (reservations[i].date === saturdayDateString) {
      saturdayReservations.push(reservations[i]);
    }
  }

  return {
    reservations: data?.reservations || [],
    fridayReservations,
    saturdayReservations,
  };
};
