// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1JcAfuFsMNrv1TGzf0-7axx_rQVASozI",
  authDomain: "fitshare-7b3ca.firebaseapp.com",
  projectId: "fitshare-7b3ca",
  storageBucket: "fitshare-7b3ca.appspot.com",
  messagingSenderId: "222541018982",
  appId: "1:222541018982:web:ed562b6036efd9e0197aa7",
  measurementId: "G-L40G2SPHC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);