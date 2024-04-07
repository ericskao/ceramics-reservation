"use client";

import Link from "next/link";
import UserProfileIcon from "../features/profile/UserProfileIcon";
import NoSSR from "./NoSSR";

const Header = () => {
  return (
    <nav className="flex justify-between w-full p-3 border-b">
      <Link href="/" className="font-semibold text-xl">
        Wilson Park Ceramics
      </Link>
      <NoSSR>
        <UserProfileIcon />
      </NoSSR>
    </nav>
  );
};

export default Header;
