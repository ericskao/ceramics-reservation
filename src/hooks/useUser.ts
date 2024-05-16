import { firebaseAuth } from "@/firebase/initFirebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export const useUser = () => {
  console.log("firebase app initialized", firebaseAuth);
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unregisterAuthObserver();
  }, [auth]);

  return {
    user,
  };
};
