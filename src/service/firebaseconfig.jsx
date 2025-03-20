// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}    from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcQOU56IAGgIdSASWAy9em4SDRFSBGyJQ",
  authDomain: "aitrip-bafdf.firebaseapp.com",
  projectId: "aitrip-bafdf",
  storageBucket: "aitrip-bafdf.firebasestorage.app",
  messagingSenderId: "283331217984",
  appId: "1:283331217984:web:940d35b5196f14c3b3eda5",
  measurementId: "G-PK26VLWC4K"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)