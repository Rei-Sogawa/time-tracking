import { ClockIcon,TrashIcon } from '@heroicons/react/outline';

import ListGroup from '../basics/ListGroup';
import { IdAndRef, Task } from '../models';

const TaskItemContainer = ({ task }: { task: Task.Data & IdAndRef }) => {
  const handleRemove = () => task.ref.delete();
  return <TaskItemPresenter task={task} onRemove={handleRemove} />;
};

const TaskItemPresenter = ({
  task,
  onRemove,
}: {
  task: Task.Data & IdAndRef;
  onRemove: () => void;
}) => {
  return (
    <ListGroup.Item>
      <div className="flex justify-between">
        <div>{task.description}</div>
        <div className="flex space-x-1">
          <ClockIcon className="h-6 w-6 cursor-pointer" />
          <TrashIcon onClick={onRemove} className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default TaskItemContainer;
