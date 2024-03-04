import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <Button>Click me!</Button>
      </div>
    </main>
  );
}
