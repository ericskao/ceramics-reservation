"use client";

import ConfirmedDatesList from "@/components/features/ConfirmedDatesList";
import Header from "@/components/shared/Header";
import Login from "@/components/shared/Login";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { useEvent } from "@/hooks/useEvent";
import { useGuests } from "@/hooks/useGuests";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Heading from "../../../../scheduler/corgical/src/components/ui/heading";

export default function Event({ params }: { params: { id: string } }) {
  // const { data, isLoading } = useEvent(params.id);
  // const eventAttributes = data?.data.event.data.attributes;
  const { userID } = useUser();
  const isHost = false;

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
        {eventDetails.availableTimes && (
          <>
            <ConfirmedDatesList
              userID={userID}
              confirmedTimes={eventDetails.availableTimes}
            />
            <Dialog
              classNames={{
                content: "rounded-t-3xl p-4",
              }}
              trigger={
                <Button variant="secondary" onClick={addMoreTimesClick}>
                  Add more times
                </Button>
              }
            >
              <Login />
            </Dialog>
          </>
        )}
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
