import firebase from "firebase/app";

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export type DocumentReference = firebase.firestore.DocumentReference;
export type Timestamp = firebase.firestore.Timestamp;
