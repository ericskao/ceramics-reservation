"use client";

import Avatar from "@/components/ui/avatar";
import Link from "next/link";

const UserProfileIcon = () => {
  return (
    <Link href="/profile">
      <Avatar />
    </Link>
  );
};

export default UserProfileIcon;
