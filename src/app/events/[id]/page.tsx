"use client";

import EventTimes from "@/components/features/event/EventTimes";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/hooks/useEvent";
import { useGuests } from "@/hooks/useGuests";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Heading from "../../../../scheduler/corgical/src/components/ui/heading";

export default function Event({ params }: { params: { id: string } }) {
  const { userId } = useUser();

  const isHost = false; // get this info from /events/:id
  const isInvited = false;

  const { eventDetails } = useEvent(params.id);
  const { guests } = useGuests(params.id);

  const onInviteClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: eventDetails.name,
          text: eventDetails.description || "Come join this event!",
          url: "https://calevent-4ylwmidyp-ericskao.vercel.app/events/13",
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert(
        "This is the web browser publish callback, we will use our custom share UI",
      );
    }
  };

  const addMoreTimesClick = () => {};

  console.log("eventDetails", eventDetails);

  return (
    <>
      <Header />
      <div className="flex flex-col py-4 px-6 gap-y-3">
        <div className="text-center">
          <Heading as="h1">{eventDetails.name}</Heading>
          <div className="text-sm">Hosted by User</div>
        </div>
        <div className="">{eventDetails.description}</div>
        <div>
          {eventDetails.img && (
            <Image src={eventDetails.img} alt="gif" width={480} height={290} />
          )}
        </div>
        <EventTimes
          availableTimes={eventDetails?.availableTimes}
          // guestList={[]}
        />

        {isHost && <Button onClick={onInviteClick}>Publish Event</Button>}

        {/* {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Heading as="h1">{eventAttributes?.title}</Heading>
          <Heading as="h3">{eventAttributes?.description}</Heading>
        </div>
      )} */}
      </div>
    </>
  );
}
