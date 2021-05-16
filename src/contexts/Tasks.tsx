import 'firebase/firestore';

import firebase from 'firebase/app';
import { sortBy } from 'ramda';
import { createContext, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';

type Values = {
  tasks: (Task.Data & IdAndRef)[];
  addStartTime: ({
    taskRef,
    prevStartTimes,
  }: {
    taskRef: firebase.firestore.DocumentReference;
    prevStartTimes: firebase.firestore.Timestamp[];
  }) => Promise<void>;
  addStopTime: ({
    taskRef,
    prevStopTimes,
  }: {
    taskRef: firebase.firestore.DocumentReference;
    prevStopTimes: firebase.firestore.Timestamp[];
  }) => Promise<void>;
  clearStartAndStopTimes: (
    taskRef: firebase.firestore.DocumentReference,
  ) => Promise<void>;
};

const initialValues: Values = {
  tasks: [],
  addStartTime: ({ taskRef, prevStartTimes }) => {
    return taskRef.update({
      startTimes: [
        ...prevStartTimes,
        firebase.firestore.FieldValue.serverTimestamp(),
      ],
    });
  },
  addStopTime: ({ taskRef, prevStopTimes }) => {
    return taskRef.update({
      stopTimes: [
        ...prevStopTimes,
        firebase.firestore.FieldValue.serverTimestamp(),
      ],
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
    <Context.Provider value={{ ...initialValues, tasks: sortedTasks }}>
      {children}
    </Context.Provider>
  );
};
