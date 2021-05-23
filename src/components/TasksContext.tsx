import { uniq } from 'ramda';
import { createContext, FC, useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { Task } from '../models';

type Values = {
  tasks: Task.Model[];
  categories: string[];
  taskBeingFocused: Task.Model | undefined;
  timer: { seconds: number; isRunning: boolean };
  focusTask: (taskId: string) => void;
  startTimer: () => void;
  countTimer: (seconds: number) => void;
  pauseTimer: () => void;
  clearTimer: () => void;
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

  const focusTask = (taskId: string) => {
    if (timer.isRunning) return;
    if (taskId === taskIdBeingFocused) {
      setTaskIdBeingFocused(undefined);
      setTimer((prev) => ({ ...prev, seconds: 0, isRunning: false }));
    } else {
      setTaskIdBeingFocused(taskId);
    }
  };

  const [timer, setTimer] = useState({ seconds: 0, isRunning: false });

  const startTimer = () => {
    if (timer.isRunning) return;
    setTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const countTimer = (seconds: number) => {
    if (!timer.isRunning) return;
    setTimer((prev) => ({ ...prev, seconds }));
  };

  const pauseTimer = () => {
    if (!timer.isRunning) return;
    if (taskBeingFocused) {
      taskBeingFocused.ref.update({ requiredSeconds: timer.seconds });
    }
    setTimer((prev) => ({ ...prev, isRunning: false }));
  };

  const clearTimer = () => {
    if (timer.isRunning) return;
    if (window.confirm('タイマーをクリアします。よろしいですか？')) {
      if (taskBeingFocused) {
        taskBeingFocused.ref.update({ requiredSeconds: 0 });
      }
      setTimer((prev) => ({ ...prev, seconds: 0 }));
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        categories,
        taskBeingFocused,
        timer,
        focusTask,
        startTimer,
        countTimer,
        pauseTimer,
        clearTimer,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
