"use client";

import Login from "@/components/shared/Login";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import Cookies from "js-cookie";
import { useState } from "react";

const UserProfileIcon = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userId } = useUser();

  console.log("user id", userId);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const onLogoutClick = () => {
    Cookies.remove("token");
  };

  if (!userId) {
    return (
      <Dialog
        classNames={{
          content: "p-4",
        }}
        open={dialogOpen}
        setOpen={setDialogOpen}
        trigger={<Button variant="secondary">Login</Button>}
      >
        <Login closeCallback={closeDialog} />
      </Dialog>
    );
  }
  return (
    <button onClick={onLogoutClick}>
      <Avatar />
    </button>

    // <Link href="/profile">
    //   <Avatar />
    // </Link>
  );
};

export default UserProfileIcon;
