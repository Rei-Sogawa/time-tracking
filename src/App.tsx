import TaskForm, { TaskFormValues } from './components/TaskForm';
import TaskList from './components/TaskList';
import { Provider as StopWatchProvider } from './contexts/stopWatch';
import { tasksRef } from './firebaseApp';
import { Task } from './models';

const App = () => {
  const handleSubmitNewTask = ({ description }: TaskFormValues) =>
    tasksRef.add({ ...Task.getDefaultData(), description });

  return (
    <StopWatchProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto py-5 max-w-screen-md space-y-3">
          <TaskForm onSubmit={handleSubmitNewTask} />
          <TaskList />
        </div>
      </div>
    </StopWatchProvider>
  );
};

export default App;
