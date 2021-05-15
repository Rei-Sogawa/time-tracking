import 'firebase/firestore';

import firebase from 'firebase/app';

export type Data = {
  description: string;
  completedAt: firebase.firestore.Timestamp | null;
  requiredSeconds: number;
  estimatedSeconds: number;
  startTimes: firebase.firestore.Timestamp[];
  stopTimes: firebase.firestore.Timestamp[];
  createdAt: firebase.firestore.Timestamp;
};

export const getDefaultData = () => ({
  description: '',
  completedAt: null,
  requiredSeconds: 0,
  estimatedSeconds: 0,
  startTimes: [],
  stopTimes: [],
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
});
