import { useCollectionData } from 'react-firebase-hooks/firestore';

import ListGroup from '../basics/ListGroup';
import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';
import TaskItemContainer from './TaskItem';

const TaskListContainer = () => {
  const [tasks] = useCollectionData<Task.Data & IdAndRef>(tasksRef, {
    idField: 'id',
    refField: 'ref',
  });
  return <TaskListPresenter tasks={tasks || []} />;
};

const TaskListPresenter = ({ tasks }: { tasks: (Task.Data & IdAndRef)[] }) => {
  return (
    <ListGroup>
      {tasks.map((task) => (
        <TaskItemContainer key={task.id} task={task} />
      ))}
    </ListGroup>
  );
};

export default TaskListContainer;
