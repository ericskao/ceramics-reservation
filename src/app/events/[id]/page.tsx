"use client";

import ConfirmedDatesList from "@/components/features/ConfirmedDatesList";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/hooks/useEvent";
import Image from "next/image";

export default function Event({ params }: { params: { id: string } }) {
  // const { data, isLoading } = useEvent(params.id);
  // const eventAttributes = data?.data.event.data.attributes;
  const data = useEvent(params.id);
  console.log("data", data);

  const onInviteClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data.name,
          text: data.description || "Come join this event!",
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

  return (
    <>
      <Header />
      <div className="flex flex-col">
        <div>{data.name}</div>
        <div>{data.description}</div>
        <div>
          {data.img && (
            <Image src={data.img} alt="gif" width={480} height={290} />
          )}
        </div>
        {data.availableTimes && (
          <ConfirmedDatesList confirmedTimes={data.availableTimes} />
        )}
        If event is published state, this button will not appear
        <Button onClick={onInviteClick}>Publish Event</Button>
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
