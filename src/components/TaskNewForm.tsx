import { Typography } from '@material-ui/core';
import { FC, useContext } from 'react';

import TaskForm, { FormValues } from './TaskForm';
import { TasksContext } from './TasksContext';

const NewTaskForm: FC<{}> = () => {
  const { addNewTask } = useContext(TasksContext);
  const handleSubmitNewTask = (values: FormValues) => {
    addNewTask(values);
  };
  return (
    <>
      <Typography variant="h6">Add New Task</Typography>
      <TaskForm onSubmit={handleSubmitNewTask} />
    </>
  );
};

export default NewTaskForm;
