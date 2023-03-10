import { useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Main from "../Main";
import Interest from "./Interest";
import "../style/LoginPage.css";

firebase.initializeApp({
  apiKey: "AIzaSyB1JcAfuFsMNrv1TGzf0-7axx_rQVASozI",
  authDomain: "fitshare-7b3ca.firebaseapp.com",
  projectId: "fitshare-7b3ca",
  storageBucket: "fitshare-7b3ca.appspot.com",
  messagingSenderId: "222541018982",
  appId: "1:222541018982:web:ed562b6036efd9e0197aa7",
  measurementId: "G-L40G2SPHC7",
});

const auth: firebase.auth.Auth = firebase.auth();
const firestore: firebase.firestore.Firestore = firebase.firestore();
const analytics: firebase.analytics.Analytics = firebase.analytics();

const LoginPage: React.FC = () => {
  const [user] = useAuthState(auth as any);
  const [interest, setInterest] = useState(0);

  // check if the current user exists in Firestore
  const checkUserExists = async () => {
    const usersCollection = firestore.collection("users");
    const currentUserDoc = usersCollection.doc(user!.uid);
    const currentUserSnapshot = await currentUserDoc.get();

    if (!currentUserSnapshot.exists) {
      // current user does not exist, create a new user document
      const userData = {
        id: user!.uid,
        displayName: user!.displayName,
        friends: [],
        programs: [],
        posts: [],
        groups: [],
        interest: [],

      };
      await currentUserDoc.set(userData);
    }
  };

  checkUserExists();
  console.log("8888888888888", interest)

  
  return (
    <div className="LoginPage">
      <section>{user ? (interest === 0 ? <Interest user={user as firebase.User} interest={interest} setInterest={setInterest}/> : <Main currentUser={user as firebase.User} />) : <SignIn />}</section>
    </div>
  );
};

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div className="sign-in">
      <h1 className="header">FitShare</h1>
      <button className="Sign-in-button" onClick={signInWithGoogle}> Sign in with Google</button>
    </div>
  );
}

export default LoginPage;
