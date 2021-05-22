import { FC } from 'react';

import useTaskService from '../hooks/useTasksService';
import TaskForm, { FormValues } from './TaskForm';

const NewTaskForm: FC<{}> = () => {
  const { addNewTask } = useTaskService();
  const handleSubmitNewTask = (values: FormValues) => {
    addNewTask(values);
  };
  return <TaskForm onSubmit={handleSubmitNewTask} />;
};

export default NewTaskForm;
