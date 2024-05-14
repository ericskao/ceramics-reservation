import { ReservationType } from "@/hooks/useReservations";
import WheelReservation from "./WheelReservation";

const DailyReservationList = ({
  reservations,
}: {
  reservations: ReservationType[];
}) => {
  // split array of reservations into time buckets (4,6,8)
  const bucketedReservations = reservations.reduce(
    (acc: { [key: string]: ReservationType[] }, curr: ReservationType) => {
      if (!acc[curr.starting_time]) {
        acc[curr.starting_time] = [curr];
      } else {
        acc[curr.starting_time].push(curr);
      }
      return acc;
    },
    {},
  );

  return (
    <div className="flex gap-x-8">
      {Object.keys(bucketedReservations).map((timeSlot) => (
        <div key={timeSlot} className="flex-grow">
          <div>{timeSlot}</div>
          <div className="flex flex-col gap-y-4">
            {bucketedReservations[timeSlot].map((reservation) => (
              <WheelReservation
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyReservationList;
