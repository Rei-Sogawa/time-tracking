import 'firebase/firestore';

import firebase from 'firebase/app';

export * as Task from './task';

export type IdAndRef = {
  id: string;
  ref: firebase.firestore.DocumentReference;
};
