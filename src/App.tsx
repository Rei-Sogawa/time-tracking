import TaskForm, { TaskFormValues } from './components/TaskForm';
import TaskList from './components/TaskList';
import { tasksRef } from './firebaseApp';
import { Task } from './models';
import * as TimerStore from './store/timer';

const App = () => {
  const handleSubmitNewTask = ({ description }: TaskFormValues) =>
    tasksRef.add({ ...Task.getDefaultData(), description });

  return (
    <TimerStore.Provider>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto py-5 max-w-screen-md space-y-3">
          <TaskForm onSubmit={handleSubmitNewTask} />
          <TaskList />
        </div>
      </div>
    </TimerStore.Provider>
  );
};

export default App;
