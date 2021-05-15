import { useCollectionData } from 'react-firebase-hooks/firestore';
import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';
import ListGroup from '../basics/ListGroup';

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
        <ListGroup.Item>{task.description}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskListContainer;
