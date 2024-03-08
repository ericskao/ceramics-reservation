"use client";

import CalendarDatePicker from "@/components/features/CalendarDatePicker";
import IndeterminateCheckbox from "@/components/features/invites/IndeterminateCheckbox";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Heading from "@/components/ui/heading";
import { format } from "date-fns";
import { useState } from "react";

// name, description, availableTimes (ConfirmedTimeType[])

const mockData = {
  name: "Soju Night",
  eventId: 1,
  description: "Chamisul Fresh only",
  location: "Pocha K",
  host: {
    name: "Frank",
    imgUrl: null,
  },
  availableTimes: [
    {
      date: new Date("2024-02-27T08:00:00.000Z"),
      startTime: new Date("2024-02-27T16:30:00.000Z"),
      endTime: new Date("2024-02-27T18:00:00.000Z"),
      id: 1,
    },
    {
      date: new Date("2024-02-27T08:00:00.000Z"),
      startTime: new Date("2024-02-27T17:30:00.000Z"),
      endTime: null,
      id: 2,
    },
    {
      date: new Date("2024-03-01T08:00:00.000Z"),
      startTime: new Date("2024-03-01T08:00:00.000Z"),
      endTime: null,
      id: 3,
    },
  ],
};

const savedAvailability: { [timeId: number]: boolean | "indeterminate" } = {};

export default function Invite({ params }: { params: { id: string } }) {
  const [inviteTimeResponses, setInviteTimeResponses] = useState<{
    [key: number]: boolean | "indeterminate";
  }>({});

  return (
    <div className="w-full">
      <Header />
      <section>
        <div className="flex flex-col pt-6 px-4 gap-y-2">
          <Heading as="h1">{mockData.name}</Heading>
          <div className="text-sm">Hosted by {mockData.host.name}</div>
          {mockData.description && <div>{mockData.description}</div>}
        </div>
        <div className="py-6 px-4">
          <div>
            Which date and times are you able to attend
            <br /> <span className="font-semibold">{mockData.name}</span>
            {mockData.location && <span> at {mockData.location}</span>}?
          </div>
          <ul className="p-3 flex flex-col gap-y-3">
            {mockData.availableTimes.map((time, index) => {
              // we should check local state for user recorded updates before defaulting to checking data from query for that particular timeId
              const checkedState = inviteTimeResponses.hasOwnProperty(time.id)
                ? inviteTimeResponses[time.id]
                : savedAvailability[time.id];
              return (
                <li key={index} className="flex gap-x-2">
                  <IndeterminateCheckbox
                    checkedState={checkedState}
                    setCheckedState={(newState) => {
                      const newAvailability = { ...inviteTimeResponses };
                      newAvailability[time.id] = newState;
                      setInviteTimeResponses(newAvailability);
                    }}
                  />
                  <div className="flex flex-col">
                    <span>{format(time.date, "PPPP")}</span>
                    <span>
                      {format(time.startTime, "p")}{" "}
                      {time.endTime && ` to ${format(time.endTime, "p")}`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <Dialog
            classNames={{
              content: "bottom-0 w-full h-5/6 rounded-t-3xl",
            }}
            trigger={
              <div>
                <Button variant="secondary">Add more times</Button>
              </div>
            }
          >
            <CalendarDatePicker
              confirmedTimes={mockData.availableTimes}
              setConfirmedTimes={() => {
                console.log("setting time");
              }}
            />
          </Dialog>
        </div>
      </section>
    </div>
  );
}
