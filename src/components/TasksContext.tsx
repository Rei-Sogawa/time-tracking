import { uniq } from 'ramda';
import { createContext, FC, useState } from 'react';

import useTasksService from '../hooks/useTasksService';
import useTasksSubscription from '../hooks/useTasksSubscription';
import { Task } from '../models';

type Values = ReturnType<typeof useTasksSubscription> &
  ReturnType<typeof useTasksService> & {
    categories: string[];
    taskBeingFocused: Task.Model | undefined;
    focusTask: (id: string) => void;
    focusOutTask: () => void;
  };

export const TasksContext = createContext({} as Values);

export const TasksProvider: FC<{}> = ({ children }) => {
  const { tasks } = useTasksSubscription();

  const {
    addNewTask,
    updateEditTask,
    toggleCompleteTask,
    removeTask,
    pauseStopWatch,
    clearStopWatch,
  } = useTasksService();

  const categories = uniq(
    tasks.map((_) => _.category).filter((_) => !!_) as string[]
  );

  const [taskIdBeingFocused, setTaskIdBeingFocused] = useState<string>();
  const taskBeingFocused = tasks.find(({ id }) => id === taskIdBeingFocused);
  const focusTask = (id: string) => setTaskIdBeingFocused(id);
  const focusOutTask = () => setTaskIdBeingFocused(undefined);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addNewTask,
        updateEditTask,
        toggleCompleteTask,
        removeTask,
        categories,
        taskBeingFocused,
        focusTask,
        focusOutTask,
        pauseStopWatch,
        clearStopWatch,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
