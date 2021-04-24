import {
  DocumentReference,
  fromDate,
  serverTimestamp,
  Timestamp,
} from "../firebaseApp";

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

type FirestoreDate = Omit<
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
  }: FirestoreDate & {
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

  toFirestoreData(): FirestoreDate {
    return {
      title: this.title,
      body: this.body,
      category: this.category,
      completed: this.completed,
      startedTimeRecords: this.startedTimeRecords.map((_) => fromDate(_)),
      stoppedTimeRecords: this.startedTimeRecords.map((_) => fromDate(_)),
      createdAt: fromDate(this.createdAt),
    };
  }

  static getDefaultFirestoreData(): FirestoreDate {
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
