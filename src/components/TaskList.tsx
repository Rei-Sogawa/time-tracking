import { sortBy } from 'ramda';
import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ListGroup from '../basics/ListGroup';
import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';
import TaskItemContainer from './TaskItem';

const TaskListContainer = () => {
  const [tasks] = useCollectionData<Task.Data & IdAndRef>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
  });
  const sortedTasks = useMemo(
    () => (tasks ? sortBy((task) => task.createdAt.toDate(), tasks) : []),
    [tasks],
  );
  return <TaskListPresenter tasks={sortedTasks} />;
};

const TaskListPresenter = ({ tasks }: { tasks: (Task.Data & IdAndRef)[] }) => {
  return tasks.length ? (
    <ListGroup>
      {tasks.map((task) => (
        <TaskItemContainer key={task.id} task={task} />
      ))}
    </ListGroup>
  ) : (
    <></>
  );
};

export default TaskListContainer;
