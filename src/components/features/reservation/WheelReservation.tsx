import { useReserveWheel } from "@/app/api/mutations/useReserveWheel";
import { ReservationType } from "@/hooks/useReservations";
import { useUser } from "@/hooks/useUser";

const WheelReservation = ({
  reservation,
}: {
  reservation: ReservationType;
}) => {
  const { reserveWheelMutation, removeReservationMutation } = useReserveWheel();
  const { user } = useUser();

  const onReserveClick = (wheelId: number) => {
    if (!user) return;
    reserveWheelMutation({ wheelId, userId: user.uid });
  };

  const onRemoveReservation = () => {
    removeReservationMutation({ wheelId: reservation.id });
  };

  return (
    <div className="basis-1/2">
      <div>Wheel {reservation.wheel_number}</div>
      {reservation.user_id ? (
        <div>
          <div>Reserved by: {reservation.user_id}</div>
          {reservation.user_id === user?.uid && (
            <button onClick={onRemoveReservation}>Remove Reservation</button>
          )}
        </div>
      ) : (
        <button
          className="border border-black"
          onClick={() => {
            reservation.id && onReserveClick(reservation.id);
          }}
        >
          Reserve this wheel
        </button>
      )}
    </div>
  );
};

export default WheelReservation;
