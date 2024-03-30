"use client";

import axiosInstance from "@/api/axiosInstance";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Tabs } from "../ui/tabs";
import EventCard from "./EventCard";

const EventTypeEnum = {
  HERDING: "herding",
  HOSTING: "hosting",
  ATTENDING: "attending",
} as const;

type EventTypeEnum = (typeof EventTypeEnum)[keyof typeof EventTypeEnum];

const EventList = () => {
  const [eventType, setEventType] = useState<string>(EventTypeEnum.HERDING);
  const [events, setEvents] = useState<any[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    getEvents(), [];
  });

  const getEvents = async () => {
    console.log("geting events");
    // TODO: FIX THIS. Checking for events length is a temporary workaround to prevent infinite loop
    if (token && events.length === 0) {
      try {
        const response = await axiosInstance.get("/events");
        console.log("GET EVENTS response: ", response);
        setEvents(response.data);
      } catch (error) {
        console.log("error in retrieving events: ", error);
      }
    }
  };

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
        <li>
          <EventCard />
        </li>
        <li>
          <EventCard />
        </li>
        <li>
          <EventCard />
        </li>
      </ul>
    </section>
  );
};

export default EventList;
