import { Divider, List } from '@material-ui/core';
import { FC } from 'react';

import { useTasks } from '../contexts/tasks';
import TaskListItem from './TaskListItem';

const TaskList: FC = () => {
  const {
    state: { tasks },
  } = useTasks();

  return (
    <List>
      {tasks.map((task, index) => (
        <div key={task.id}>
          <TaskListItem task={task} />
          {index !== tasks.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
};

export default TaskList;
