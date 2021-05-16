import { useContext } from 'react';

import { Context } from '../contexts/Tasks';
import TaskItemContainer from './TaskItem';

const TaskList = () => {
  const { tasks } = useContext(Context);
  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItemContainer key={task.id} task={task} />
      ))}
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default TaskList;
