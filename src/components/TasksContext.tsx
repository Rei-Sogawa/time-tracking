import { uniq } from 'ramda';
import { createContext, FC } from 'react';

import useTasksService from '../hooks/useTasksService';
import useTasksSubscription from '../hooks/useTasksSubscription';

type Values = ReturnType<typeof useTasksSubscription> &
  ReturnType<typeof useTasksService> & {
    categories: string[];
  };

export const TasksContext = createContext({} as Values);

export const TasksProvider: FC<{}> = ({ children }) => {
  const { tasks } = useTasksSubscription();

  const { addNewTask, updateEditTask, toggleCompleteTask, removeTask } =
    useTasksService();

  const categories = uniq(
    tasks.map((_) => _.category).filter((_) => !!_) as string[]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addNewTask,
        updateEditTask,
        toggleCompleteTask,
        removeTask,
        categories,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
