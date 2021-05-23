import { FC, useContext } from 'react';

import { Task } from '../models';
import TaskForm, { FormValues } from './TaskForm';
import { TasksContext } from './TasksContext';

type Props = {
  task: Task.Model;
  toggleEditForm: (nextValue?: any) => void;
};

const EditTaskForm: FC<Props> = ({ task, toggleEditForm }) => {
  const { updateEditTask } = useContext(TasksContext);
  const handleSubmitEditTask = (values: FormValues) => {
    updateEditTask({ task, values });
    toggleEditForm(false);
  };
  return (
    <>
      <TaskForm
        onSubmit={handleSubmitEditTask}
        defaultValues={{
          description: task.description,
          category: task.category,
          estimatedMinutes: task.estimatedMinutes,
        }}
      />
    </>
  );
};

export default EditTaskForm;
