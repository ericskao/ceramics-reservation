"use client";

import "firebase/compat/auth";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex justify-between w-full p-3 border-b">
      <Link href="/" className="font-semibold text-xl">
        Wilson Park Ceramics
      </Link>
      {/* <NoSSR>
        <UserProfileIcon />
      </NoSSR> */}
    </nav>
  );
};

export default Header;
