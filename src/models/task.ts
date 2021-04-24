import { serverTimestamp, DocumentReference, Timestamp } from "./index";

type DataOnFirestore = Omit<
  Task,
  "id" | "ref" | "startedTimeRecords" | "stoppedTimeRecords" | "createdAt"
> & {
  startedTimeRecords: Timestamp[];
  stoppedTimeRecords: Timestamp[];
  createdAt: Timestamp;
};

class Task {
  id: string;
  ref: DocumentReference;
  title: string;
  body: string;
  completed: boolean;
  startedTimeRecords: Date[];
  stoppedTimeRecords: Date[];
  createdAt: Date;

  constructor({
    id,
    ref,
    title,
    body,
    completed,
    startedTimeRecords,
    stoppedTimeRecords,
    createdAt,
  }: DataOnFirestore & {
    id: string;
    ref: DocumentReference;
  }) {
    this.id = id;
    this.ref = ref;
    this.title = title;
    this.body = body;
    this.completed = completed;
    this.startedTimeRecords = startedTimeRecords.map((_) => _.toDate());
    this.stoppedTimeRecords = stoppedTimeRecords.map((_) => _.toDate());
    this.createdAt = createdAt.toDate();
  }

  static getDefaultFirestoreData(): DataOnFirestore {
    return {
      title: "",
      body: "",
      completed: false,
      startedTimeRecords: [],
      stoppedTimeRecords: [],
      createdAt: serverTimestamp() as Timestamp,
    };
  }
}
