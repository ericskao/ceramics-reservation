"use client";

import Waitlist from "@/components/features/reservation/Waitlist";
import Header from "@/components/shared/Header";
import NoSSR from "@/components/shared/NoSSR";
import { useUser } from "@/hooks/useUser";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

const weekendMockData = [
  {
    id: 1,
    day: "Friday",
    date: "5/2/2024",
    reservations: [
      {
        id: 1,
        reservation: {
          name: "Eric",
          userId: 1,
        },
      },
      {
        id: 2,
        reservation: {
          name: "Anisha",
          userId: 2,
        },
      },
      {
        id: 3,
        reservation: {
          name: "Josephine",
          userId: 3,
        },
      },
      {
        id: 8,
        reservation: null,
      },
      {
        id: 7,
        reservation: null,
      },
      {
        id: 6,
        reservation: null,
      },
      {
        id: 4,
        reservation: {
          name: "Matt",
          userId: 4,
        },
      },
      {
        id: 5,
        reservation: {
          name: "Lisa",
          userId: 5,
        },
      },
      {
        id: 9,
        reservation: null,
      },
    ],
  },
  {
    id: 2,
    day: "Saturday",
    date: "5/3/2024",
    reservations: [
      {
        id: 11,
        reservation: {
          name: "Eric",
          userId: 1,
        },
      },
      {
        id: 12,
        reservation: {
          name: "Anisha",
          userId: 2,
        },
      },
      {
        id: 13,
        reservation: {
          name: "Josephine",
          userId: 3,
        },
      },
      {
        id: 18,
        reservation: null,
      },
      {
        id: 17,
        reservation: null,
      },
      {
        id: 16,
        reservation: null,
      },
      {
        id: 14,
        reservation: {
          name: "Matt",
          userId: 4,
        },
      },
      {
        id: 15,
        reservation: {
          name: "Lisa",
          userId: 5,
        },
      },
      {
        id: 19,
        reservation: null,
      },
    ],
  },
];

const sampleWaitlist = ["Patrick", "Sue", "Kim", "Eric"];

export default function Home() {
  const [weekPagination, setWeekPagination] = useState<number>(0);

  const { user } = useUser();

  function onClick(e: any) {
    const postData = async () => {
      const response = await fetch("/api/hello", {
        method: "GET",
      });
      return response.json();
    };
    postData().then((data) => {
      console.log(data);
    });
  }

  const onReserveClick = (wheelId: number) => {
    console.log("trying to reserve", wheelId, "by user", user?.uid);
  };

  const onWheelRemoveClick = ({
    userId,
    wheelId,
  }: {
    userId: string | undefined;
    wheelId: number;
  }) => {
    console.log("remove from wheel");
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <NoSSR>
        <main className="p-4">
          <div className="flex justify-between">
            <button onClick={() => setWeekPagination(weekPagination - 1)}>
              <ArrowLeftIcon />
            </button>
            <button onClick={() => setWeekPagination(weekPagination + 1)}>
              <ArrowRightIcon />
            </button>
          </div>
          <div className="w-full px-4 flex-wrap flex gap-y-4">
            {weekendMockData.map((weekend) => (
              <div key={weekend.id}>
                <div className="text-xl">
                  {weekend.day} {weekend.date}
                </div>
                <div>
                  {weekend.reservations.map((wheel, index) => (
                    <div className="basis-1/2" key={index}>
                      <div>Wheel {index + 1}</div>
                      {wheel.reservation ? (
                        <div>
                          <div>Reserved by: {wheel.reservation.name}</div>
                          {wheel.reservation.name === "Eric" && (
                            <button
                              onClick={() =>
                                onWheelRemoveClick({
                                  userId: user?.uid,
                                  wheelId: wheel.id,
                                })
                              }
                            >
                              Remove from wheel
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          className="border border-black"
                          onClick={() => onReserveClick(wheel.id)}
                        >
                          Reserve this wheel
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div onClick={onClick}>click me</div>
          <Waitlist waitlist={sampleWaitlist} />
        </main>
      </NoSSR>
    </div>
  );
}
