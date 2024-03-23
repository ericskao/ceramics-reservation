import Login from "@/components/shared/Login";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { chunkDates } from "@/utils/dates";
import { compareAsc, format } from "date-fns";
import { ConfirmedTimeType } from "../EventForm.types";
import EventTimeSelect from "./EventTimeSelect";

const guestListMock = [
  { userId: 3, name: "Eric", rsvpStatus: "going" },
  { userId: 5, name: "Frank", rsvpStatus: "maybe" },
  { userId: 6, name: "Yang", rsvpStatus: "unconfirmed" },
  { userId: 7, name: "Luke", rsvpStatus: "not-going" },
];

const EventTimes = ({
  availableTimes,
  userId,
  guestList,
}: {
  availableTimes: ConfirmedTimeType[];
  userId?: number;
  guestList?: any;
}) => {
  if (!availableTimes) {
    return "No available times";
  }
  const chunkedDates = chunkDates(availableTimes);
  const sortedDates = Object.keys(chunkedDates).sort(compareAsc);

  return (
    <div className="flex flex-col gap-y-3">
      <ul className="flex flex-col gap-y-2">
        {sortedDates.map((date) => {
          return (
            <li key={date} className="flex">
              <div>
                <div>{format(date, "PPPP")}</div>
                <ul className="list-inside">
                  {chunkedDates[date].map((eventTime, index) => (
                    <EventTimeSelect key={index} eventTime={eventTime} />
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      {userId ? (
        <Button variant="secondary">Add More Times - pop hour adder</Button>
      ) : (
        <Dialog
          classNames={{
            content: "rounded-t-3xl p-4",
          }}
          trigger={<Button variant="secondary">Add More Times (login)</Button>}
        >
          <Login />
        </Dialog>
      )}
    </div>
  );
};

export default EventTimes;
