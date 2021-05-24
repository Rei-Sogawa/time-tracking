import { Divider, List } from '@material-ui/core';
import { FC, ReactNode } from 'react';

import { Task } from '../models';
import { Props as TaskFormProps } from './TaskForm';
import TaskListItem from './TaskListItem';

type Props = {
  tasks: Task.Model[];
  taskForm: ({
    defaultValues,
    onSubmit,
  }: Pick<TaskFormProps, 'defaultValues' | 'onSubmit'>) => ReactNode;
};

const TaskList: FC<Props> = ({ tasks, taskForm }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <div key={task.id}>
          <TaskListItem task={task} taskForm={taskForm} />
          {index !== tasks.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
};

export default TaskList;
