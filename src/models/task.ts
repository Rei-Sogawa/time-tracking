import { omit } from "ramda";

import {
  DocumentReference,
  fromDate,
  serverTimestamp,
  Timestamp,
} from "../firebaseApp";

export type Data = {
  title: string;
  body: string;
  category: string;
  estimatedMinutes: number;
  requiredSeconds: number;
  startTimeRecords: Date[];
  stopTimeRecords: Date[];
  createdAt: Date;
  completedAt: Date | null;
};

export type DataWithIdAndRef = Data & { id: string; ref: DocumentReference };

export type FirestoreData = Omit<
  Data,
  "startTimeRecords" | "stopTimeRecords" | "createdAt" | "completedAt"
> & {
  startTimeRecords: Timestamp[];
  stopTimeRecords: Timestamp[];
  createdAt: Timestamp;
  completedAt: Timestamp | null;
};

export const toFirestore: (data: Data) => FirestoreData = (data) => ({
  ...data,
  startTimeRecords: data.startTimeRecords.map(fromDate),
  stopTimeRecords: data.stopTimeRecords.map(fromDate),
  createdAt: fromDate(data.createdAt),
  completedAt: data.completedAt ? fromDate(data.completedAt) : null,
});

export const fromFirestore: (firestoreData: FirestoreData) => Data = (
  firestoreData
) => ({
  ...firestoreData,
  startTimeRecords: firestoreData.startTimeRecords.map((_) => _.toDate()),
  stopTimeRecords: firestoreData.startTimeRecords.map((_) => _.toDate()),
  createdAt: firestoreData.createdAt.toDate(),
  completedAt: firestoreData.completedAt
    ? firestoreData.completedAt.toDate()
    : null,
});

export const getDefaultData: () => Data = () => ({
  title: "",
  body: "",
  category: "",
  estimatedMinutes: 0,
  requiredSeconds: 0,
  startTimeRecords: [],
  stopTimeRecords: [],
  createdAt: new Date(),
  completedAt: null,
});

export const getDefaultFirestoreData: () => FirestoreData = () => ({
  ...toFirestore(getDefaultData()),
  createdAt: serverTimestamp() as Timestamp,
});

export const isComplete = (data: Data) => !!data.completedAt;

export const omitIdAndRefFromData: (
  dataWithIdAndRef: DataWithIdAndRef
) => Data = (dataWithIdAndRef) => {
  return omit(["id", "ref"], dataWithIdAndRef);
};
