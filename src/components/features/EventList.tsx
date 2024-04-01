"use client";

import { EventInterface } from "@/types/events.types";
import Cookies from "js-cookie";
import { useState } from "react";
import { Tabs } from "../ui/tabs";
import EventCard from "./EventCard";

const EventTypeEnum = {
  HERDING: "herding",
  HOSTING: "hosting",
  ATTENDING: "attending",
} as const;

type EventTypeEnum = (typeof EventTypeEnum)[keyof typeof EventTypeEnum];

const EventList = ({
  hostEvents = [],
  participatingEvents = [],
  pastEvents = [],
}: {
  hostEvents: EventInterface[];
  participatingEvents: EventInterface[];
  pastEvents: EventInterface[];
}) => {
  const [eventType, setEventType] = useState<string>(EventTypeEnum.HERDING);
  const token = Cookies.get("token");

  return (
    <section>
      <Tabs
        options={[
          { value: EventTypeEnum.HERDING },
          { value: EventTypeEnum.HOSTING },
          { value: EventTypeEnum.ATTENDING },
        ]}
        classNames={{ root: "w-full", list: "justify-center" }}
        onValueChange={(eventType) => setEventType(eventType)}
      />
      <ul className="flex flex-col pt-3 gap-5">
        {hostEvents.map((event) => (
          <li key={event.id}>
            <EventCard isHost event={event} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventList;
