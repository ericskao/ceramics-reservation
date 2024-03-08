"use client";

import Login from "@/components/shared/Login";
import "react-phone-input-2/lib/style.css";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-52">
      <Login />
    </div>
  );
}
