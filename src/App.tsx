import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import ListGroup from './basics/ListGroup';
import * as Task from './models/task';
import TaskItem from './components/TaskItem';

const App = () => {
  const [tasks, setTasks] = useState<Task.Data[]>([]);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto py-5 max-w-screen-md space-y-3">
        <TaskForm
          handleSubmit={({ description }) => {
            setTasks((prevState) => [
              ...prevState,
              { ...Task.getDefaultData(), description },
            ]);
          }}
        />
        {tasks.length > 0 && (
          <ListGroup>
            {tasks.map((task) => (
              <TaskItem task={task} key={task.description} />
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default App;
