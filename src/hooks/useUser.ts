import { getAuth } from "firebase/auth";
import { useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);

  const auth = getAuth();

  console.log("auth", auth.currentUser);

  return {
    user: auth?.currentUser,
  };
};
