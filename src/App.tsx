import TaskForm, { TaskFormValues } from './components/TaskForm';
import TaskList from './components/TaskList';
import * as StopWatchContext from './contexts/StopWatch';
import * as TasksContext from './contexts/Tasks';
import { tasksRef } from './firebaseApp';
import { Task } from './models';

const App = () => {
  const handleSubmitNewTask = ({ description }: TaskFormValues) => {
    return tasksRef.add({ ...Task.getDefaultData(), description });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto py-5 max-w-screen-md space-y-3">
        <TaskForm onSubmit={handleSubmitNewTask} />
        <TasksContext.Provider>
          <TaskList />
        </TasksContext.Provider>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <StopWatchContext.Provider>
    <App />
  </StopWatchContext.Provider>
);
