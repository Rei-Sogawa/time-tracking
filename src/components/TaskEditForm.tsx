import { FC } from 'react';

import { Task } from '../models';
import TaskForm, { FormValues } from './TaskForm';

type Props = {
  task: Task.Model;
  toggleEditForm: (nextValue?: any) => void;
};

const EditTaskForm: FC<Props> = ({ task, toggleEditForm }) => {
  const handleSubmitEditTask = (values: FormValues) => {
    task.ref.update({ ...values });
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
