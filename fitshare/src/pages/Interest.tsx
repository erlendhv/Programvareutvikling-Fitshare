import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import "./../style/Interest.css";

interface User {
  uid: string;
}

interface Props {
  user: User;
  interest: number;
  setInterest: (interest: number) => void;
}

const Interest = (props: Props) => {
  // const [interest, setInterest] = useState(0);
  const StoreInterest = (interestNumber: number) => {
    const usersCollection = firebase.firestore().collection("users");
    const currentUserDoc = usersCollection.doc(props.user!.uid);
    currentUserDoc.update({ interest: interestNumber });
    props.setInterest(interestNumber);
  }
  return (<div className="Interest-container">
    <h1 className="Interest-header">What are you interested in?</h1>
    <button className="Interest-button" onClick={() => { StoreInterest(1) }}>Weight Loss</button>
    <button className="Interest-button" onClick={() => { StoreInterest(2) }}>Strength</button>
    <button className="Interest-button" onClick={() => { StoreInterest(3) }}>Endurance</button>
  </div>)
}

export default Interest;