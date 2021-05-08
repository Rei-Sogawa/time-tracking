import React from 'react';
import TaskForm, { TaskFormValues } from './components/TaskForm';
import ListGroup from './basics/ListGroup';
import * as Task from './models/task';
import TaskItem from './components/TaskItem';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './firebaseApp';

const tasksRef = db.collection('tasks');

const App = () => {
  const [tasks] = useCollectionData<Task.Data>(tasksRef);
  const handleSubmitNewTask = ({ description }: TaskFormValues) => {
    tasksRef.add({ ...Task.getDefaultData(), description });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto py-5 max-w-screen-md space-y-3">
        <TaskForm handleSubmit={handleSubmitNewTask} />
        {tasks && tasks.length > 0 && (
          <ListGroup>
            {tasks.map((task) => (
              <TaskItem task={task} />
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default App;
