"use client";

import Header from "@/components/shared/Header";
import NoSSR from "@/components/shared/NoSSR";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-3">
      <Header />
      <NoSSR>
        <main className="w-full px-4">
          <div>content here</div>
        </main>
      </NoSSR>
    </div>
  );
}
