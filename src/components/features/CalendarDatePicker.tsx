import { cn } from "@/lib/utils";
import { useEventStore } from "@/store/eventStore";
import {
  addHours,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { ConfirmedTimeType } from "./EventForm.types";
import HourPicker from "./HourPicker";

const CalendarDatePicker = ({
  confirmedTimes,
  guestProposedTimes = [],
  setProposedTimes,
  addProposedTime,
  removeProposedTime,
}: {
  confirmedTimes: ConfirmedTimeType[];
  setProposedTimes?: Dispatch<SetStateAction<ConfirmedTimeType[]>>;
  guestProposedTimes?: ConfirmedTimeType[];
  addProposedTime?: (proposedTime: ConfirmedTimeType) => void;
  removeProposedTime?: any;
}) => {
  const today = new Date();
  const [months, setMonths] = useState<Date[][]>([]);
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [numOfMonths, setNumOfMonths] = useState<number>(3);

  const eventStore = useEventStore();

  const prependMonthFn = useCallback((monthArr: Date[]) => {
    const numDaysAfterSunday = getDay(monthArr[0]);
    const nullArray = Array(numDaysAfterSunday).fill(null);
    return [...nullArray, ...monthArr];
  }, []);

  console.log("guest proposed times in cdp", guestProposedTimes);

  useEffect(() => {
    const currentDate = new Date();
    const nextMonths = Array.from({ length: numOfMonths }, (_, index) =>
      eachDayOfInterval({
        start: startOfMonth(addMonths(currentDate, index)),
        end: endOfMonth(addMonths(currentDate, index)),
      }),
    );
    setMonths(nextMonths);
  }, [numOfMonths]);

  const chunkArray = useCallback((array: Date[], size: number) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }, []);

  const loadMoreDates = () => {
    setNumOfMonths(numOfMonths + 3);
  };

  const clearState = (close: boolean) => {
    close && setDateSelected(null);
    eventStore.setHourPickerOpen(false);
    setStartTime(null);
    setEndTime(null);
  };

  const onRemoveTime = (timeRange: ConfirmedTimeType) => {
    let filteredTimes = (
      setProposedTimes ? confirmedTimes : guestProposedTimes
    ).filter(
      (time) =>
        !(
          time.date === timeRange.date &&
          time.startTime === timeRange.startTime &&
          time.endTime === timeRange.endTime
        ),
    );
    if (setProposedTimes) {
      // setProposedTimes is passed (event creation), so this is host
      setProposedTimes(filteredTimes);
    } else if (removeProposedTime) {
      // need to check if time to be removed is proposed by guest and not host
      // filter out from proposedTimes
      removeProposedTime(filteredTimes);
    }
    clearState(false);
  };

  const onConfirmTime = async ({
    startTime,
    endTime,
  }: {
    startTime: number;
    endTime?: number | null;
  }) => {
    // if setProposedTime is passed in, that means we are in event creation, else event has been created already and we are adding new times
    if (setProposedTimes) {
      setProposedTimes([
        ...confirmedTimes,
        {
          date: dateSelected as Date,
          startTime: addHours(dateSelected as Date, startTime),
          endTime:
            endTime !== null && endTime !== undefined
              ? addHours(dateSelected as Date, endTime)
              : null,
        },
      ]);
    } else if (addProposedTime) {
      console.log(startTime, endTime, dateSelected);
      addProposedTime({
        date: dateSelected as Date,
        startTime: addHours(dateSelected as Date, startTime),
        endTime:
          endTime !== null && endTime !== undefined
            ? addHours(dateSelected as Date, endTime)
            : null,
      });
    }
    setTimeout(() => {
      clearState(false);
    }, 500);
  };

  return (
    <>
      <div className="relative">
        <section className="relative">
          <div className="flex w-full sticky top-0 bg-white z-10 font-semibold border-b border-b-gray-200 px-4 pt-6 [&>*]:w-12 [&>*]:p-2 [&>*]:flex-1 [&>*]:text-center [&>*]:text-secondary-text [&>*]:text-xs">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          <div className="flex flex-col gap-y-10 pt-4 px-3">
            {months.map((month, index) => {
              return (
                <div key={index}>
                  <h2 className="py-2 pl-4 font-semibold">
                    {format(month[0], "MMMM y")}
                  </h2>
                  <table className="w-full">
                    <tbody>
                      {chunkArray(prependMonthFn(month), 7).map(
                        (week, weekIndex) => (
                          <tr key={weekIndex}>
                            {week.map((date: any, index: number) => {
                              const disabled =
                                !date ||
                                (isBefore(date, today) &&
                                  !isSameDay(date, today));
                              const isTodaysDate = isToday(date);
                              const isConfirmed = confirmedTimes.find((time) =>
                                isSameDay(time.date, date),
                              );
                              const isGuestProposed = guestProposedTimes.find(
                                (time) => isSameDay(time.date, date),
                              );
                              return (
                                <td className="text-center" key={index}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (disabled) {
                                        setDateSelected(null);
                                        eventStore.setHourPickerOpen(false);
                                      } else {
                                        setDateSelected(
                                          dateSelected === date ? null : date,
                                        );
                                        eventStore.setHourPickerOpen(
                                          dateSelected === date ? false : true,
                                        );
                                      }
                                    }}
                                    className={cn("p-2 w-12 h-12 font-medium", {
                                      "opacity-30 outline-none": disabled,
                                      "font-extrabold": isTodaysDate,
                                      "bg-black rounded-full text-white font-extrabold":
                                        date === dateSelected && !!date,
                                      "bg-primary text-white rounded-full font-extrabold":
                                        isConfirmed,
                                      "bg-blue-500 text-white rounded-full font-extrabold":
                                        isGuestProposed,
                                      "border-4 border-black/30":
                                        (isConfirmed || isGuestProposed) &&
                                        date === dateSelected &&
                                        !!date,
                                    })}
                                  >
                                    {date && (
                                      <div className="relative">
                                        {format(date, "d")}
                                        {isTodaysDate && (
                                          <div
                                            className={cn(
                                              "w-1 h-1 bg-black rounded-full absolute right-1/2 transform translate-x-1/2 translate-y-1/2",
                                              { "bg-white": isConfirmed },
                                            )}
                                          />
                                        )}
                                      </div>
                                    )}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
          <div className="text-center pt-4 pb-12">
            <Button onClick={loadMoreDates} variant="secondary">
              Load more dates
            </Button>
          </div>
        </section>
      </div>
      {dateSelected && (
        <HourPicker
          selectedDate={dateSelected}
          onConfirmTime={onConfirmTime}
          confirmedTimes={confirmedTimes}
          guestProposedTimes={guestProposedTimes}
          onRemoveTime={onRemoveTime}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onClose={() => {
            clearState(true);
          }}
        />
      )}
    </>
  );
};

export default CalendarDatePicker;
