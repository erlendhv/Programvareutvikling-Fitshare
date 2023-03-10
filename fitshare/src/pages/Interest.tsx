import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

interface User {
  uid: string;
}

interface Props {
  user: User;
  interest : number;
  setInterest: (interest: number) => void;
}

const Interest = (props: Props) => {
 // const [interest, setInterest] = useState(0);
  const UpdateDatabase = (number: number) => {
    const usersCollection = firebase.firestore().collection("users");
    const currentUserDoc = usersCollection.doc(props.user!.uid);
    currentUserDoc.update({ interest: number });
    props.setInterest(number);
  }
  return (<div>
    <h1>Interest</h1>
    <p>What are you interested in?</p>
    <button onClick={() => {UpdateDatabase(1)}}>Weight Loss</button>
    <button onClick={() => {UpdateDatabase(2)}}>Strength</button>
    <button onClick={() => {UpdateDatabase(3)}}>Endurance</button>
    </div>)
}

export default Interest;