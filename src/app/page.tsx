"use client";

import EventList from "@/components/features/EventList";
import Header from "@/components/shared/Header";
import NoSSR from "@/components/shared/NoSSR";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useEvents } from "@/hooks/useEvents";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Home() {
  const { upcomingHostedEvents, upcomingParticipatingEvents, pastEvents } =
    useEvents();

  const { userId, token } = useUser();

  const upcomingEventsQuantity =
    upcomingHostedEvents.length + upcomingParticipatingEvents.length;

  const renderWelcomeScreen = () => {
    if (userId) {
      return (
        <div>
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
        </div>
      );
    }
    // not logged in:
    return (
      <div>
        <Heading as="h1">Welcome!</Heading>
        <div className="py-2">
          Planning an event? Get together? More copy here.
          <br />
          Maybe an image or video here or on the next page
        </div>
        <Link href="/new">
          <Button className="mt-2">Click here to get started!</Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <NoSSR>
        <main className="w-full px-4">{renderWelcomeScreen()}</main>
      </NoSSR>
    </div>
  );
}
