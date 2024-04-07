"use client";

import Avatar from "@/components/ui/avatar";

const UserProfileIcon = () => {
  const onLogoutClick = () => {
    console.log("logout click");
  };

  return (
    <button onClick={onLogoutClick}>
      <Avatar />
    </button>
  );
};

export default UserProfileIcon;
