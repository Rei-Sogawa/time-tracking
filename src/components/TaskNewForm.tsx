import { Typography } from '@material-ui/core';
import { FC } from 'react';

import { tasksRef } from '../firebaseApp';
import { Task } from '../models';
import TaskForm, { FormValues } from './TaskForm';

const NewTaskForm: FC<{}> = () => {
  const handleSubmitNewTask = (values: FormValues) => {
    return tasksRef.add({ ...Task.getDefaultData(), ...values });
  };

  return (
    <>
      <Typography variant="h6">Add New Task</Typography>
      <TaskForm onSubmit={handleSubmitNewTask} />
    </>
  );
};

export default NewTaskForm;
