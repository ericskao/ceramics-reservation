"use client";

import ConfirmedDatesList from "@/components/features/ConfirmedDatesList";
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
          text: data.description,
          url: "https://calevent-4ylwmidyp-ericskao.vercel.app/events/13",
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    }
  };

  return data ? (
    <div>
      {data.name}
      {data.description}
      {data.img && <Image src={data.img} alt="gif" width={480} height={290} />}
      {data.availableTimes && (
        <ConfirmedDatesList confirmedTimes={data.availableTimes} />
      )}
      <button onClick={onInviteClick}>Invite</button>
      {/* {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Heading as="h1">{eventAttributes?.title}</Heading>
          <Heading as="h3">{eventAttributes?.description}</Heading>
        </div>
      )} */}
    </div>
  ) : (
    <div>{params.id}</div>
  );
}
