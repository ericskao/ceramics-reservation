import EventForm from "@/components/features/EventForm";
import Header from "@/components/shared/Header";

export default function NewEvent() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1 flex flex-col">
        <EventForm />
      </main>
    </div>
  );
}
