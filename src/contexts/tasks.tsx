import { uniq } from 'ramda';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { Task } from '../models';

type State = {
  tasks: Task.Model[];
  taskIdBeingFocused: string | undefined;
  categories: string[];
};

type Selector = {
  findTaskById: (taskId: string) => Task.Model | undefined;
};

type Action = {
  focusTask: (taskId: string) => void;
  focusOutTask: () => void;
};

type Value = {
  state: State;
  selector: Selector;
  action: Action;
};

const TasksContext = createContext<Value | undefined>(undefined);

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

  const findTaskById = useCallback(
    (taskId: string) => tasks.find(({ id }) => id === taskId),
    [tasks]
  );

  const [taskIdBeingFocused, setTaskIdBeingFocused] = useState<string>();
  const focusTask = (taskId: string) => setTaskIdBeingFocused(taskId);
  const focusOutTask = () => setTaskIdBeingFocused(undefined);

  const value: Value = {
    state: {
      tasks,
      taskIdBeingFocused,
      categories,
    },
    selector: {
      findTaskById,
    },
    action: {
      focusTask,
      focusOutTask,
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
