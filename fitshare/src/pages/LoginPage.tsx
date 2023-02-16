import { useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Main from "../Main";
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

  return (
    <div className="LoginPage">
      <section>{user ? <Main /> : <SignIn />}</section>
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
      <h1>FitShare</h1>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
    </div>
  );
}

export default LoginPage;
