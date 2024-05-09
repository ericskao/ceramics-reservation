"use client";

import { firebaseConfig } from "@/firebase/config";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [firebaseApp, setFirebaseApp] = useState<null | firebase.app.App>(null);
  useEffect(() => {
    const initialized = firebase.initializeApp(firebaseConfig);
    setFirebaseApp(initialized);
  }, []);

  return <div>{children}</div>;
};

export default Layout;
