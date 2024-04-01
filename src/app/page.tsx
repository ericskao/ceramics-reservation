"use client";

import EventList from "@/components/features/EventList";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useEvents } from "@/hooks/useEvents";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Home() {
  const { upcomingHostedEvents, upcomingParticipatingEvents, pastEvents } =
    useEvents();
  const { userId } = useUser();

  const upcomingEventsQuantity =
    upcomingHostedEvents.length + upcomingParticipatingEvents.length;

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <main className="w-full px-4">
        <Heading as="h1">
          Welcome back, <br /> Eric!
        </Heading>
        <div className="pt-2">
          You have <span className="font-bold">{upcomingEventsQuantity}</span>{" "}
          upcoming event
          {upcomingEventsQuantity === 1 ? "" : "s"}.
        </div>
        <Link href="/new">
          <Button className="mt-2">
            {upcomingEventsQuantity === 0
              ? "Create one now"
              : "Create an event"}
          </Button>
        </Link>
        <EventList
          hostEvents={upcomingHostedEvents}
          participatingEvents={upcomingParticipatingEvents}
          pastEvents={pastEvents}
        />
      </main>
    </div>
  );
}
