import { chunkDates } from "@/utils/dates";
import { compareAsc, format } from "date-fns";
import { ConfirmedTimeType } from "./EventForm.types";

const ConfirmedDatesList = ({
  confirmedTimes = [],
}: {
  confirmedTimes: ConfirmedTimeType[];
}) => {
  const chunkedDates = chunkDates(confirmedTimes);
  const sortedDates = Object.keys(chunkedDates).sort(compareAsc);

  return (
    <div className="shadow-inner-secondary rounded-lg p-3 min-h-52 max-h-96 overflow-y-scroll">
      <ul className="flex flex-col gap-y-4">
        {sortedDates.map((date, index) => {
          return (
            <li key={index}>
              <span className="font-medium">{format(date, "PPPP")}</span>
              <ul className="list-inside">
                {chunkedDates[date].map((range, index) => (
                  <li className="pl-2" key={index}>
                    &#8226; {format(range.startTime, "p")}
                    {range.endTime && ` - ${format(range.endTime, "p")}`}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConfirmedDatesList;
