import { Divider, List } from '@material-ui/core';
import { FC, useContext } from 'react';

import TaskListItem from './TaskListItem';
import { TasksContext } from './TasksContext';

const TaskList: FC<{}> = () => {
  const { tasks } = useContext(TasksContext);

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
