import 'firebase/firestore';

import { sortBy } from 'ramda';
import { createContext, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';

type Values = {
  tasks: (Task.Data & IdAndRef)[];
};

const initialValues: Values = {
  tasks: [],
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
