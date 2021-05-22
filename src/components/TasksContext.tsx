import { createContext, FC } from 'react';

import useTasksService from '../hooks/useTasksService';
import useTasksSubscription from '../hooks/useTasksSubscription';

type Values = ReturnType<typeof useTasksSubscription> &
  ReturnType<typeof useTasksService>;

export const TasksContext = createContext({} as Values);

export const TasksProvider: FC<{}> = ({ children }) => {
  const { tasks } = useTasksSubscription();
  const { addNewTask, toggleCompleteTask, removeTask } = useTasksService();
  return (
    <TasksContext.Provider
      value={{ tasks, addNewTask, toggleCompleteTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
