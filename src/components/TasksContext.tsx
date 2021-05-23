import { uniq } from 'ramda';
import { createContext, FC, useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { Task } from '../models';

type Values = {
  tasks: Task.Model[];
  categories: string[];
  taskBeingFocused: Task.Model | undefined;
  focusTask: (taskId: string) => void;
  focusOutTask: () => void;
};

export const TasksContext = createContext({} as Values);

export const TasksProvider: FC<{}> = ({ children }) => {
  const [values] = useCollectionData<Task.Model>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
    snapshotListenOptions: {},
  });

  const tasks = useMemo(() => values || [], [values]);

  const categories = uniq(
    tasks.map(({ category }) => category).filter((_) => !!_) as string[]
  );

  const [taskIdBeingFocused, setTaskIdBeingFocused] = useState<string>();

  const taskBeingFocused = tasks.find(({ id }) => taskIdBeingFocused === id);

  const focusTask = (taskId: string) => setTaskIdBeingFocused(taskId);

  const focusOutTask = () => setTaskIdBeingFocused(undefined);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        categories,
        taskBeingFocused,
        focusTask,
        focusOutTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
