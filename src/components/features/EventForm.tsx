"use client";

import useDebounce from "@/hooks/useDebounce";
import { GiphyFetch } from "@giphy/js-fetch-api";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Dialog from "../ui/dialog";
import { Input } from "../ui/input";
import CalendarDatePicker from "./CalendarDatePicker";
import ConfirmedDatesList from "./ConfirmedDatesList";
import { ConfirmedTimeType } from "./EventForm.types";

const EventForm = () => {
  const router = useRouter();
  const [confirmedTimes, setConfirmedTimes] = useState<ConfirmedTimeType[]>([]);
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [gif, setGif] = useState<string | null>(null);

  const debouncedSearch = useDebounce(eventName, 1000);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 11);
    // future use these images and allow user to select
    const gf = new GiphyFetch("OfXdtsVnL0PmyfUlR5KgAlIdaApkGkxM");
    gf.search(debouncedSearch, { offset: 0, limit: 10 }).then((res) => {
      setGif(res.data[randomNum]?.images.downsized.url);
    });
  }, [gif, debouncedSearch]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const localEvents = localStorage.getItem("savedEvents");
    const payload = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      availableTimes: confirmedTimes,
      img: gif,
    };
    const savedEvents = localEvents ? JSON.parse(localEvents) : [];
    const id = savedEvents.length + 1;
    savedEvents.push({ ...payload, id });
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    router.push(`/events/${id}`);
  };

  return (
    <Form.Root
      onSubmit={onFormSubmit}
      className="flex flex-col gap-y-3 p-4 flex-1"
    >
      <Form.Field name="title">
        <Form.Control asChild>
          <Input
            id="event-name"
            labelText="Event Name"
            inputRequired={true}
            value={eventName}
            onInputChange={(e) => setEventName(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="description">
        <Form.Control asChild>
          <Input
            id="event-description"
            inputType="textarea"
            labelText="Event Description"
            value={eventDescription}
            onInputChange={(e) => setEventDescription(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="event-location">
        <Form.Control asChild>
          <Input
            id="event-location"
            inputType="text"
            labelText="Location"
            value={eventLocation}
            onInputChange={(e) => setEventLocation(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="giphy">
        <Form.Control asChild>
          {gif && <Image src={gif} alt="gif" width={200} height={100} />}
        </Form.Control>
      </Form.Field>
      <Form.Field name="eventDate" className="flex flex-col relative">
        <Form.Control className="relative" asChild>
          <Dialog
            classNames={{
              content: "bottom-0 w-full h-5/6 rounded-t-3xl",
            }}
            trigger={
              <div>
                <Button className="text-xs pb-0 pl-0 underline" variant="link">
                  Add Dates
                </Button>
                <ConfirmedDatesList confirmedTimes={confirmedTimes} />
              </div>
            }
          >
            <CalendarDatePicker
              confirmedTimes={confirmedTimes}
              setConfirmedTimes={setConfirmedTimes}
            />
          </Dialog>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button disabled={!eventName} className="mt-auto">
          Save Draft
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default EventForm;
