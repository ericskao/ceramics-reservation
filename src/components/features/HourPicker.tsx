import { cn } from "@/lib/utils";
import { format, isSameDay, isToday } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import Alert from "../ui/alert";
import { Button } from "../ui/button";
import { ConfirmedTimeType } from "./EventForm.types";
import HourList from "./HourList";

const HOUR_PICKER_HEADER_CLASS = "font-semibold pb-1 border-b";

const HourPicker = ({
  onClose,
  onConfirmTime,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  confirmedTimes,
  onRemoveTime,
  selectedDate,
}: {
  onClose: () => void;
  onConfirmTime: ({
    startTime,
    endTime,
  }: {
    startTime: number;
    endTime?: number | null;
  }) => void;
  startTime: number | null;
  setStartTime: Dispatch<SetStateAction<number | null>>;
  endTime: number | null;
  setEndTime: Dispatch<SetStateAction<number | null>>;
  confirmedTimes: ConfirmedTimeType[];
  onRemoveTime: (timeRange: ConfirmedTimeType) => void;
  selectedDate: Date;
}) => {
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<ConfirmedTimeType | null>();
  const [addTimeEnabled, setAddTimeEnabled] = useState<boolean>(false);

  const confirmedTimesForDate = confirmedTimes.filter((time) =>
    isSameDay(time.date, selectedDate),
  );
  const todaySelected = isToday(selectedDate);

  return (
    <section className="bg-white w-screen border-t-2 border-gray-200 h-[250px] sticky bottom-0 z-10 flex pt-3">
      {/* <div className="flex justify-between px-3">
        <h2 className="font-bold text-xl mb-2">
          {format(selectedDate, "EEEE, LLLL do")}
        </h2>
        <button className="z-10" onClick={onClose}>
          &#10006;
        </button>
      </div> */}

      <div className="flex flex-col flex-1 justify-between h-full relative">
        <div className="flex h-full pb-[42px]">
          {confirmedTimesForDate.length > 0 && !addTimeEnabled ? (
            <div className="p-4 h-full flex flex-col">
              <h2 className="font-bold text-xl mb-2">
                {format(confirmedTimesForDate[0].date, "EEEE, LLLL do")}{" "}
              </h2>
              <ul className="flex-1 overflow-scroll">
                {confirmedTimesForDate.map((range, index) => (
                  <h3 key={index} className="text-lg">
                    <Button
                      onClick={() =>
                        setSelectedTimeRange(
                          selectedTimeRange?.date === range.date &&
                            selectedTimeRange?.startTime === range.startTime &&
                            selectedTimeRange.endTime === range.endTime
                            ? null
                            : range,
                        )
                      }
                      variant="ghost"
                      className={cn({
                        "border border-gray-700":
                          range.date === selectedTimeRange?.date &&
                          range.startTime === selectedTimeRange.startTime &&
                          range.endTime === selectedTimeRange.endTime,
                      })}
                    >
                      {format(range.startTime, "h:mmaa")}
                      {range.endTime && ` - ${format(range.endTime, "h:mmaa")}`}
                    </Button>
                  </h3>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex-1 h-full overflow-y-scroll text-center">
              <h2 className={HOUR_PICKER_HEADER_CLASS}>Start Time</h2>
              <HourList
                todaySelected={todaySelected}
                onHourSelect={(val) => {
                  if (
                    typeof val === "number" &&
                    typeof endTime === "number" &&
                    val > endTime
                  ) {
                    setEndTime(null);
                  }
                  setStartTime(val);
                }}
                startTime={startTime}
                selectedHour={startTime}
              />
            </div>
          )}
          {(!confirmedTimesForDate.length || addTimeEnabled) &&
            startTime !== null && (
              <div className="flex-1 overflow-y-scroll text-center">
                <h2 className={HOUR_PICKER_HEADER_CLASS}>End Time</h2>
                <HourList
                  todaySelected={todaySelected}
                  onHourSelect={setEndTime}
                  startTime={startTime}
                  selectedHour={endTime}
                  filteredByStartTime
                />
              </div>
            )}
        </div>
        <div className="absolute bottom-0 w-full">
          {confirmedTimesForDate.length > 0 && !addTimeEnabled ? (
            <div className="flex">
              {!addTimeEnabled && selectedTimeRange && (
                <Alert
                  trigger={
                    <Button
                      variant="destructive"
                      className="w-full font-bold rounded-none"
                    >
                      Remove
                    </Button>
                  }
                  title="Are you sure?"
                  description={`This will remove selected time range from ${format(selectedTimeRange.startTime, "h:mmaa")}${selectedTimeRange.endTime ? " to " + format(selectedTimeRange.endTime, "h:mmaa") : ""}.`}
                  action={
                    <button
                      onClick={() => onRemoveTime(selectedTimeRange)}
                      className="text-red-900 font-bold"
                    >
                      {"Continue"}
                    </button>
                  }
                />
              )}
              <Button
                variant="default"
                onClick={() => {
                  setAddTimeEnabled(true);
                }}
                className="w-full font-bold rounded-none"
              >
                Add Time
              </Button>
            </div>
          ) : (
            <div className="flex">
              {addTimeEnabled && (
                <Button
                  className="w-full"
                  onClick={() => {
                    setStartTime(null);
                    setEndTime(null);
                    setAddTimeEnabled(false);
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => {
                  onConfirmTime({ startTime: startTime as number, endTime });
                  setAddTimeEnabled(false);
                }}
                disabled={startTime === null}
                className="w-full font-bold rounded-none"
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HourPicker;
