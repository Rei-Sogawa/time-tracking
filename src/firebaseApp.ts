import "firebase/firestore";

import firebase from "firebase/app";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAbEcwQm6gym4qPYLO-grpFvwoutSF-TsI",
    authDomain: "time-tracking-267fa.firebaseapp.com",
    projectId: "time-tracking-267fa",
    storageBucket: "time-tracking-267fa.appspot.com",
    messagingSenderId: "981000197641",
    appId: "1:981000197641:web:c87cd164d3ee078dca8ad8",
    measurementId: "G-S93XLG9DTE",
  });
}

export const db = firebase.firestore();

export type DocumentReference = firebase.firestore.DocumentReference;
export type Timestamp = firebase.firestore.Timestamp;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
