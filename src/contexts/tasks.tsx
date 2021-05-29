import { uniq } from 'ramda';
import { createContext, FC, useContext, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { Task } from '../models';

type State = {
  tasks: Task.Model[];
  categories: string[];
};

const TasksContext = createContext<{ state: State } | undefined>(undefined);

const TasksProvider: FC = ({ children }) => {
  const [values] = useCollectionData<Task.Model>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
  });
  const tasks = useMemo(() => values || [], [values]);

  const categories = useMemo(
    () =>
      uniq(
        tasks
          .map(({ category }) => category)
          .filter((category): category is string => !!category)
      ),
    [tasks]
  );

  const value = {
    state: {
      tasks,
      categories,
    },
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error();
  return context;
}

export { TasksProvider, useTasks };
