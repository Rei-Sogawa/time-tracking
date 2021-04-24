import { DocumentReference, serverTimestamp, Timestamp } from "../firebaseApp";

type ITask = {
  id: string;
  ref: DocumentReference;
  title: string;
  body: string;
  category: string;
  completed: boolean;
  startedTimeRecords: Date[];
  stoppedTimeRecords: Date[];
  createdAt: Date;
};

type DataOnFirestore = Omit<
  ITask,
  "id" | "ref" | "startedTimeRecords" | "stoppedTimeRecords" | "createdAt"
> & {
  startedTimeRecords: Timestamp[];
  stoppedTimeRecords: Timestamp[];
  createdAt: Timestamp;
};

export default class Task implements ITask {
  id: string;
  ref: DocumentReference;
  title: string;
  body: string;
  category: string;
  completed: boolean;
  startedTimeRecords: Date[];
  stoppedTimeRecords: Date[];
  createdAt: Date;

  constructor({
    id,
    ref,
    title,
    body,
    category,
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
    this.category = category;
    this.completed = completed;
    this.startedTimeRecords = startedTimeRecords.map((_) => _.toDate());
    this.stoppedTimeRecords = stoppedTimeRecords.map((_) => _.toDate());
    this.createdAt = createdAt.toDate();
  }

  static getDefaultFirestoreData(): DataOnFirestore {
    return {
      title: "",
      body: "",
      category: "",
      completed: false,
      startedTimeRecords: [],
      stoppedTimeRecords: [],
      createdAt: serverTimestamp() as Timestamp,
    };
  }
}
