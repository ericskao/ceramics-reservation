"use client";

import StyledFirebaseAuth from "@/firebase/StyledFirebaseAuth";
// Import FirebaseAuth and firebase.
import { firebaseConfig } from "@/firebase/config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCheckAndInsertUser } from "../api/queries/checkAndAddUser";

function SignInScreen() {
  firebase.initializeApp(firebaseConfig);

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // const { user } = useUser();
  const router = useRouter();
  const { checkUser, insertUser } = useCheckAndInsertUser();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (res: any) => {
        const user = res.user;
        checkUser(user.uid).then((data) => {
          if (!data) {
            // insert user
            insertUser(user);
          }
        });
        router.push("/");
        return true;
      },
    },
  };

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>
        Welcome {firebase?.auth()?.currentUser?.displayName}! You are now
        signed-in!
      </p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );
}

export default SignInScreen;
