import { fromDate, serverTimestamp, Timestamp } from "../firebaseApp";

export type Data = {
  title: string;
  body: string;
  category: string;
  estimatedSeconds: number;
  requiredSeconds: number;
  completed: boolean;
  startTimeRecords: Date[];
  stopTimeRecords: Date[];
  createdAt: Date;
};

export type FirestoreData = Omit<
  Data,
  "startTimeRecords" | "stopTimeRecords" | "createdAt"
> & {
  startTimeRecords: Timestamp[];
  stopTimeRecords: Timestamp[];
  createdAt: Timestamp;
};

export const toFirestore: (data: Data) => FirestoreData = (data) => ({
  ...data,
  startTimeRecords: data.startTimeRecords.map(fromDate),
  stopTimeRecords: data.stopTimeRecords.map(fromDate),
  createdAt: fromDate(data.createdAt),
});

export const fromFirestore: (firestoreData: FirestoreData) => Data = (
  firestoreData
) => ({
  ...firestoreData,
  startTimeRecords: firestoreData.startTimeRecords.map((_) => _.toDate()),
  stopTimeRecords: firestoreData.startTimeRecords.map((_) => _.toDate()),
  createdAt: firestoreData.createdAt.toDate(),
});

export const getDefaultData: () => Data = () => ({
  title: "",
  body: "",
  category: "",
  estimatedSeconds: 0,
  requiredSeconds: 0,
  completed: false,
  startTimeRecords: [],
  stopTimeRecords: [],
  createdAt: new Date(),
});

export const getDefaultFirestoreData: () => FirestoreData = () => ({
  ...toFirestore(getDefaultData()),
  createdAt: serverTimestamp() as Timestamp,
});
