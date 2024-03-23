import { format } from "date-fns";
import { useState } from "react";
import { ConfirmedTimeType } from "../EventForm.types";
import IndeterminateCheckbox from "../invites/IndeterminateCheckbox";

const mockData = {
  eventId: 3,
  rsvpState: true,
  // rsvpState: undefined
};

const EventTimeSelect = ({ eventTime }: { eventTime: ConfirmedTimeType }) => {
  const [rsvpState, setCheckedState] = useState<
    boolean | "indeterminate" | undefined
  >(mockData.rsvpState);

  const updateRsvp = (newState: boolean | "indeterminate" | undefined) => {
    // make API call here, on success, update the checked state here
    setCheckedState(newState);
  };

  return (
    <div className="flex">
      <IndeterminateCheckbox
        checkedState={rsvpState}
        setCheckedState={updateRsvp}
      />
      <li className="pl-2">
        {format(eventTime.startTime, "p")}
        {eventTime.endTime && ` - ${format(eventTime.endTime, "p")}`}
      </li>
    </div>
  );
};

export default EventTimeSelect;
