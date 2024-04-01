import { EventInterface } from "@/types/events.types";
import Link from "next/link";

const EventCard = ({
  isHost,
  event,
}: {
  event: EventInterface;
  isHost?: boolean;
}) => {
  return (
    <Link href={`/events/${event.attributes.code}`}>
      <div>
        <div className="relative">
          <div className="h-[200px] bg-slate-500" />
          {isHost && (
            <div className="absolute right-0 top-0 bg-black text-white p-2">
              HOSTING
            </div>
          )}
          <div className="absolute right-0 bottom-0 pb-1 pr-2">
            <div className="flex relative">
              <div className="bg-blue-300 rounded-full p-1 text-xs border-white border">
                EK
              </div>
              <div className="bg-red-100 rounded-full p-1 text-xs z-10 border-white border ml-[-4px]">
                FC
              </div>
              <div className="rounded-full bg-gray-200 text-xs p-1 border-transparent ml-0.5 border">
                4+
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="text-black font-semibold">
              {event.attributes.title}
            </div>
            <div className="text-[#717171] text-sm flex gap-x-1">
              <div>Hosted by </div>
              <div className="truncate w-40">
                {event.relationships.user.data.id}
              </div>
            </div>
          </div>
          {/* <div>3 Optimal time options</div> */}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
