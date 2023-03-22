import { useEffect, useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "../style/LoginPage.css";
import './../style/App.css';
import NewAd from "./NewAd";
import { v4 as uuidv4 } from 'uuid';
import { BiArrowBack } from 'react-icons/bi';

firebase.initializeApp({
    apiKey: "AIzaSyB1JcAfuFsMNrv1TGzf0-7axx_rQVASozI",
    authDomain: "fitshare-7b3ca.firebaseapp.com",
    projectId: "fitshare-7b3ca",
    storageBucket: "fitshare-7b3ca.appspot.com",
    messagingSenderId: "222541018982",
    appId: "1:222541018982:web:ed562b6036efd9e0197aa7",
    measurementId: "G-L40G2SPHC7",
});

const AdLoginPage = (props: { handleBack: () => void }) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");

    const [signingIn, setSigningIn] = useState(true);

    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    const [currentAdvertiserId, setCurrentAdvertiserId] = useState("");

    const signIn = async () => {
        const advertiserRef = await firebase.firestore().collection('advertiser').where('username', '==', userName).get();
        if (advertiserRef.docs.length === 0) {
            alert("No user found");
            return;
        }
        const advertiser = advertiserRef.docs[0].data();
        if (advertiser.password !== password) {
            alert("Incorrect password");
            return;
        }
        setCurrentAdvertiserId(advertiserRef.docs[0].id);
        setHasLoggedIn(true);
    };

    const signUp = async () => {
        const advertiserCollection = firebase.firestore().collection('advertiser');
        const advertiserRef = await advertiserCollection.where('username', '==', userName).get();
        if (advertiserRef.docs.length !== 0) {
            alert("Username already taken");
            return;
        }

        const newAdvertiserId = uuidv4();

        const newAdvertiser = {
            id: newAdvertiserId,
            username: userName,
            password: password,
            businessName: businessName,
        };

        advertiserCollection.doc(newAdvertiserId).set(newAdvertiser);

        setCurrentAdvertiserId(newAdvertiserId);
        setHasLoggedIn(true);
    };

    return (
        hasLoggedIn ? <NewAd currentAdvertiserId={currentAdvertiserId} /> :
            <div className="sign-in">
                <BiArrowBack className="Back-button" onClick={props.handleBack} />
                <h1 className="header">FitShare</h1>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="Input-field" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="Input-field" />
                {!signingIn && <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Business Name" className="Input-field" />}
                <button className="Sign-in-button" onClick={() => signingIn ? signIn() : signUp()}>{`Sign ${signingIn ? "in" : "up"} as advertiser`}</button>
                <p className="Sign-in-text">{`${signingIn ? "Don't have a user?" : "Already have a user?"}`}</p>
                <button className="Sign-up-button" onClick={() => setSigningIn(!signingIn)}>{`Sign ${signingIn ? "up" : "in"} as advertiser`}</button>
            </div>
    );
};

export default AdLoginPage;
