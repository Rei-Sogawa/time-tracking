import { useCollectionData } from 'react-firebase-hooks/firestore';
import { tasksRef } from '../firebaseApp';
import { IdAndRef, Task } from '../models';
import ListGroup from '../basics/ListGroup';
import composeHooks from 'react-hooks-compose';

const useTaskList = () => {
  const [tasks] = useCollectionData<Task.Data & IdAndRef>(tasksRef, {
    idField: 'id',
    refField: 'ref',
  });
  return { tasks: tasks || [] };
};

const TaskListPresenter: React.FC<ReturnType<typeof useTaskList>> = ({
  tasks,
}) => {
  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item>{task.description}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default composeHooks({ useTaskList })(TaskListPresenter);
