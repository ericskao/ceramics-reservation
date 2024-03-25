import Login from "@/components/shared/Login";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { useEventStore } from "@/store/store";
import { chunkDates } from "@/utils/dates";
import { compareAsc, format } from "date-fns";
import { useState } from "react";
import CalendarDatePicker from "../CalendarDatePicker";
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
  const eventStore = useEventStore();

  // proposed times are user suggested times; users should be able to add and also remove their suggested times, but not remove other peoples suggested times

  const [proposedTimes, setProposedTimes] = useState<ConfirmedTimeType[]>([]);

  const addProposedTime = (time: any) => {
    console.log("adding this time", time);
  };

  const removeProposedTime = (time: any) => {
    console.log("removing this time", time);
  };

  const setProposedTime = (time: any) => {
    console.log("event times", availableTimes, time);
    // forward this to setProposedTime state
    // setProposedTimes(time);
  };

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
        <Dialog
          classNames={{
            content: "bottom-0 w-full h-5/6 rounded-t-3xl",
          }}
          overflowHidden={eventStore.hourPickerOpen}
          trigger={
            <Button variant="secondary">Add More Times - pop hour adder</Button>
          }
        >
          <CalendarDatePicker
            confirmedTimes={availableTimes}
            proposedTimes={proposedTimes}
            addProposedTime={addProposedTime}
            removeProposedTime={removeProposedTime}
          />
        </Dialog>
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
