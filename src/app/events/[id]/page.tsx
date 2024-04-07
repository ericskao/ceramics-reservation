"use client";

import EventTimes from "@/components/features/event/EventTimes";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useEvent } from "@/hooks/useEvent";
import { useUser } from "@/hooks/useUser";

export default function Event({ params }: { params: { id: string } }) {
  const { userId } = useUser();
  const { event, isLoading, guests } = useEvent({ id: params.id });

  const host = guests?.user?.data?.id;
  const isHost = host === userId;

  const onInviteClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: event.description || "Come join this event!",
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <div className="flex flex-col py-4 px-6 gap-y-3">
        <div className="text-center">
          <Heading as="h1">{event.title}</Heading>
          <div className="text-sm">
            Hosted by <div className="">{guests.user.data.id}</div>
          </div>
        </div>
        <div className="">{event.description}</div>
        {/* <div>
          {eventDetails.img && (
            <Image src={eventDetails.img} alt="gif" width={480} height={290} />
          )}
        </div> */}
        <EventTimes
          availableTimes={event?.availableTimes}
          // guestList={[]}
        />
        {isHost && <Button onClick={onInviteClick}>Publish Event</Button>}
      </div>
    </>
  );
}
