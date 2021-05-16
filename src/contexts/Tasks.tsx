import 'firebase/firestore';

import firebase from 'firebase/app';
import { sortBy } from 'ramda';
import { createContext, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';

type Values = {
  tasks: (Task.Data & IdAndRef)[];
  deleteTask: (taskRef: firebase.firestore.DocumentReference) => Promise<void>;
  addStartTime: (taskRef: firebase.firestore.DocumentReference) => Promise<void>;
  addStopTime: (taskRef: firebase.firestore.DocumentReference) => Promise<void>;
  clearStartAndStopTimes: (taskRef: firebase.firestore.DocumentReference) => Promise<void>;
};

const initialValues: Values = {
  tasks: [],
  deleteTask: (taskRef) => {
    return taskRef.delete();
  },
  addStartTime: (taskRef) => {
    return taskRef.update({
      startTimes: firebase.firestore.FieldValue.arrayUnion(firebase.firestore.Timestamp.now()),
    });
  },
  addStopTime: (taskRef) => {
    return taskRef.update({
      stopTimes: firebase.firestore.FieldValue.arrayUnion(firebase.firestore.Timestamp.now()),
    });
  },
  clearStartAndStopTimes: (taskRef) => {
    return taskRef.update({
      startTimes: [],
      stopTimes: [],
    });
  },
};

export const Context = createContext<Values>(initialValues);

export const Provider: React.FC<{}> = ({ children }) => {
  const [tasks] = useCollectionData<Task.Data & IdAndRef>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
  });

  const sortedTasks = useMemo(
    () => (tasks ? sortBy((task) => -task.createdAt.toDate(), tasks) : []),
    [tasks],
  );

  return (
    <Context.Provider value={{ ...initialValues, tasks: sortedTasks }}>{children}</Context.Provider>
  );
};
