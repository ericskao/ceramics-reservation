import { cn } from "@/lib/utils";
import { getNextClosestTime } from "@/utils/time";
import { Dispatch, SetStateAction } from "react";

export const HOURS = [
  { label: "8:00AM", value: 8 },
  { label: "8:30AM", value: 8.5 },
  { label: "9:00AM", value: 9 },
  { label: "9:30AM", value: 9.5 },
  { label: "10:00AM", value: 10 },
  { label: "10:30AM", value: 10.5 },
  { label: "11:00AM", value: 11 },
  { label: "11:30AM", value: 11.5 },
  { label: "12:00PM", value: 12 },
  { label: "12:30PM", value: 12.5 },
  { label: "1:00PM", value: 13 },
  { label: "1:30PM", value: 13.5 },
  { label: "2:00PM", value: 14 },
  { label: "2:30PM", value: 14.5 },
  { label: "3:00PM", value: 15 },
  { label: "3:30PM", value: 15.5 },
  { label: "4:00PM", value: 16 },
  { label: "4:30PM", value: 16.5 },
  { label: "5:00PM", value: 17 },
  { label: "5:30PM", value: 17.5 },
  { label: "6:00PM", value: 18 },
  { label: "6:30PM", value: 18.5 },
  { label: "7:00PM", value: 19 },
  { label: "7:30PM", value: 19.5 },
  { label: "8:00PM", value: 20 },
  { label: "8:30PM", value: 20.5 },
  { label: "9:00PM", value: 21 },
  { label: "9:30PM", value: 21.5 },
  { label: "10:00PM", value: 22 },
  { label: "10:30PM", value: 22.5 },
  { label: "11:00PM", value: 23 },
  { label: "11:30PM", value: 23.5 },
  { label: "12:00AM", value: 0 },
  { label: "12:30AM", value: 0.5 },
  { label: "1:00AM", value: 1 },
  { label: "1:30AM", value: 1.5 },
  { label: "2:00AM", value: 2 },
  { label: "2:30AM", value: 2.5 },
  { label: "3:00AM", value: 3 },
  { label: "3:30AM", value: 3.5 },
  { label: "4:00AM", value: 4 },
  { label: "4:30AM", value: 4.5 },
  { label: "5:00AM", value: 5 },
  { label: "5:30AM", value: 5.5 },
  { label: "6:00AM", value: 6 },
  { label: "6:30AM", value: 6.5 },
  { label: "7:00AM", value: 7 },
  { label: "7:30AM", value: 7.5 },
];

const HourList = ({
  todaySelected,
  onHourSelect,
  startTime,
  filteredByStartTime = false,
  selectedHour,
}: {
  todaySelected: boolean;
  onHourSelect: Dispatch<SetStateAction<number | null>>;
  startTime: number | null;
  filteredByStartTime?: boolean;
  selectedHour: number | null;
}) => {
  const nextClosestTimeIndex = HOURS.findIndex(
    (hour) => hour.label === getNextClosestTime(),
  );
  const sortedHours = todaySelected
    ? HOURS.slice(nextClosestTimeIndex).concat(
        HOURS.slice(0, nextClosestTimeIndex),
      )
    : HOURS;
  const hours = filteredByStartTime
    ? sortedHours.filter((hour) => hour.value > (startTime || 0))
    : sortedHours;

  return (
    <ul className="flex flex-col">
      {hours.map((hour) => (
        <li
          key={hour.value}
          className={cn("py-2", {
            "font-bold bg-gray-100": selectedHour === hour.value,
            "font-medium": selectedHour !== hour.value,
          })}
        >
          <button
            className="w-full"
            onClick={() => {
              onHourSelect(selectedHour === hour.value ? null : hour.value);
            }}
          >
            {hour.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HourList;
