import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ConfirmedTimeType } from "./EventForm.types";

const ConfirmedTimesForDate = ({
  confirmedTimes,
}: {
  confirmedTimes: ConfirmedTimeType[];
}) => {
  const [confirmedTimeRange, setConfirmedTimeRange] = useState<
    ConfirmedTimeType | undefined
  >();

  useEffect(() => {
    if (!confirmedTimeRange && confirmedTimes.length > 0) {
      setConfirmedTimeRange(confirmedTimes[0]);
    } else if (confirmedTimeRange && !confirmedTimes.length) {
      setConfirmedTimeRange(undefined);
    }
  }, [confirmedTimes, confirmedTimeRange]);

  if (!confirmedTimeRange) {
    return;
  }

  return (
    <>
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">
          {format(confirmedTimeRange.date, "EEEE, LLLL do")}
        </h2>
        <h3 className="text-lg">
          {format(confirmedTimeRange.startTime, "h:mmaa")}
          {confirmedTimeRange.endTime &&
            ` - ${format(confirmedTimeRange.endTime, "h:mmaa")}`}
        </h3>
      </div>
      <div className="absolute bottom-0 w-full">Remove</div>
    </>
  );
};

export default ConfirmedTimesForDate;
