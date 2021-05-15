import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import { useToggle } from 'react-use';

import ListGroup from '../basics/ListGroup';
import { IdAndRef, Task } from '../models';
import StopWatch from './StopWatch';

const TaskItemContainer = ({ task }: { task: Task.Data & IdAndRef }) => {
  const handleRemove = () =>
    window.confirm('タスクを削除します。よろしいですか？') && task.ref.delete();
  return <TaskItemPresenter task={task} onRemove={handleRemove} />;
};

const TaskItemPresenter = ({
  task,
  onRemove,
}: {
  task: Task.Data & IdAndRef;
  onRemove: () => void;
}) => {
  const [showStopWatch, toggleShowStopWatch] = useToggle(false);

  return (
    <ListGroup.Item>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>{task.description}</div>
          <div className="flex space-x-2">
            <ClockIcon
              onClick={toggleShowStopWatch}
              className="h-6 w-6 cursor-pointer"
            />
            <TrashIcon onClick={onRemove} className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
        {showStopWatch && (
          <>
            <hr />
            <StopWatch task={task} />
          </>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default TaskItemContainer;
