import { User, getAuth } from "firebase/auth";
import { useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  return {
    user: auth?.currentUser,
  };
};
