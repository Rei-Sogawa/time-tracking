import firebase from 'firebase/app';
import 'firebase/firestore';

export * as Task from './task';

export type IdAndRef = {
  id: string;
  ref: firebase.firestore.DocumentReference;
};
