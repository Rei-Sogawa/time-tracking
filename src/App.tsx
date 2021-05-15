import React from 'react';
import TaskForm, { TaskFormValues } from './components/TaskForm';
import TaskList from './components/TaskList';
import { db } from './firebaseApp';
import { Task } from './models';

const tasksRef = db.collection('tasks');

const App = () => {
  const handleSubmitNewTask = ({ description }: TaskFormValues) => {
    tasksRef.add({ ...Task.getDefaultData(), description });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto py-5 max-w-screen-md space-y-3">
        <TaskForm handleSubmit={handleSubmitNewTask} />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
