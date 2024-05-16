"use client";

import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/auth-store";
import { Avatar } from "@mantine/core";
import "firebase/compat/auth";
import { useState } from "react";

const UserProfileIcon = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  const clearToken = useAuthStore((state) => state.clearToken);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const onLogoutClick = () => {
    console.log("user logout", user);
    // Cookies.remove("token");
    // clearToken();
  };

  // if (!userId) {
  //   return (
  //     <Dialog
  //       classNames={{
  //         content: "p-4",
  //       }}
  //       open={dialogOpen}
  //       setOpen={setDialogOpen}
  //       trigger={<Button variant="secondary">Login</Button>}
  //     >
  //       <Login closeCallback={closeDialog} />
  //     </Dialog>
  //   );
  // }
  return (
    <button onClick={onLogoutClick}>
      <Avatar />
    </button>
  );
};

export default UserProfileIcon;
