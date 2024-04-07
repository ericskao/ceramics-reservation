import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { useEventStore } from "@/store/eventStore";
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
  guestList,
}: {
  availableTimes: ConfirmedTimeType[];
  userId?: number;
  guestList?: any;
}) => {
  const eventStore = useEventStore();
  const { userId } = useUser();
  // proposed times are user suggested times; users should be able to add and also remove their suggested times, but not remove other peoples suggested times

  const [guestProposedTimes, setGuestProposedTimes] = useState<
    ConfirmedTimeType[]
  >([]);

  const addProposedTime = (proposedTime: ConfirmedTimeType) => {
    setGuestProposedTimes([...guestProposedTimes, proposedTime]);
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
    <>
      <div className="flex flex-col gap-y-3 border border-secondary rounded-md p-4">
        <ul className="flex flex-col gap-y-2">
          {sortedDates.map((date) => {
            return (
              <li key={date} className="flex">
                <div>
                  <div className="flex">
                    {chunkedDates[date].length > 1 && <button>{"V"}</button>}
                    <div>{format(date, "PPPP")}</div>
                  </div>

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
        <Dialog
          classNames={{
            content: "bottom-0 w-full h-5/6 rounded-t-3xl",
          }}
          trigger={<Button variant="secondary">Add More Times</Button>}
        >
          <CalendarDatePicker
            confirmedTimes={availableTimes}
            guestProposedTimes={guestProposedTimes}
            addProposedTime={addProposedTime}
            removeProposedTime={setGuestProposedTimes}
          />
        </Dialog>
      </div>
      {guestProposedTimes.length > 0 && <Button>Save Changes</Button>}
    </>
  );
};

export default EventTimes;
