import 'firebase/firestore';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAbEcwQm6gym4qPYLO-grpFvwoutSF-TsI',
  authDomain: 'time-tracking-267fa.firebaseapp.com',
  projectId: 'time-tracking-267fa',
  storageBucket: 'time-tracking-267fa.appspot.com',
  messagingSenderId: '981000197641',
  appId: '1:981000197641:web:c87cd164d3ee078dca8ad8',
  measurementId: 'G-S93XLG9DTE',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const tasksRef = db.collection('tasks');

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export type IdAndRef = {
  id: string;
  ref: firebase.firestore.DocumentReference;
};
export type Timestamp = firebase.firestore.Timestamp;
export type FieldValue = firebase.firestore.FieldValue;
