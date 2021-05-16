import { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import TaskForm, { TaskFormValues } from './components/TaskForm';
import TaskList from './components/TaskList';
import * as StopWatchContext from './contexts/StopWatch';
import * as TasksContext from './contexts/Tasks';
import { tasksRef } from './firebaseApp';
import { Task } from './models';
import { convertSeconds } from './utils/convertSeconds';

const App = () => {
  const handleSubmitNewTask = ({ description }: TaskFormValues) => {
    return tasksRef.add({ ...Task.getDefaultData(), description });
  };

  const { seconds: totalSeconds, taskWithOpen } = useContext(StopWatchContext.Context);
  const { formattedTime } = convertSeconds(totalSeconds);
  const title = taskWithOpen ? formattedTime : 'time tracker';

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto py-5 max-w-screen-md space-y-3">
          <TaskForm onSubmit={handleSubmitNewTask} />
          <TasksContext.Provider>
            <TaskList />
          </TasksContext.Provider>
        </div>
      </div>
    </HelmetProvider>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <StopWatchContext.Provider>
    <App />
  </StopWatchContext.Provider>
);
