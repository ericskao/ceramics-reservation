"use client";

import Heading from "@/components/ui/heading";
import { useEvent } from "@/hooks/useEvent";

export default function Event({ params }: { params: { id: string } }) {
  const { data, isLoading } = useEvent(params.id);

  const eventAttributes = data?.data.event.data.attributes;

  return (
    <div>
      {params.id}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Heading as="h1">{eventAttributes?.title}</Heading>
          <Heading as="h3">{eventAttributes?.description}</Heading>
        </div>
      )}
    </div>
  );
}
