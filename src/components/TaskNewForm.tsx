import { Typography } from '@material-ui/core';
import { FC } from 'react';

import { useTasks } from '../contexts/tasks';
import { tasksRef } from '../firebaseApp';
import { Task } from '../models';
import TaskForm, { FormValues } from './TaskForm';

const NewTaskForm: FC = () => {
  const {
    selector: { categories },
  } = useTasks();

  const handleSubmitNewTask = (values: FormValues) => {
    return tasksRef.add({ ...Task.getDefaultData(), ...values });
  };

  return (
    <>
      <Typography variant="h6">Add New Task</Typography>
      <TaskForm categories={categories} onSubmit={handleSubmitNewTask} />
    </>
  );
};

export default NewTaskForm;
