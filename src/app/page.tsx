"use client";

import DailyReservationList from "@/components/features/reservation/DailyReservationList";
import Waitlist from "@/components/features/reservation/Waitlist";
import Header from "@/components/shared/Header";
import NoSSR from "@/components/shared/NoSSR";
import { useReservations } from "@/hooks/useReservations";
import { useUser } from "@/hooks/useUser";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

const sampleWaitlist = ["Patrick", "Sue", "Kim", "Eric"];

export default function Home() {
  const [weekPagination, setWeekPagination] = useState<number>(0);

  const { user } = useUser();
  const { fridayReservations, saturdayReservations } = useReservations();

  console.log("friday", fridayReservations);

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <NoSSR>
        <main className="p-4 w-full">
          <div className="flex justify-between">
            <button onClick={() => setWeekPagination(weekPagination - 1)}>
              <ArrowLeftIcon />
            </button>
            <button onClick={() => setWeekPagination(weekPagination + 1)}>
              <ArrowRightIcon />
            </button>
          </div>
          <div className="w-full px-4">
            <DailyReservationList reservations={fridayReservations} />
          </div>
          <Waitlist waitlist={sampleWaitlist} />
        </main>
      </NoSSR>
    </div>
  );
}
