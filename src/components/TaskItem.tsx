import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { useToggle } from 'react-use';

import ListGroup from '../basics/ListGroup';
import { IdAndRef, Task } from '../models';
import * as TimerStore from '../store/timer';
import StopWatch from './StopWatch';

const TaskItemContainer = ({ task }: { task: Task.Data & IdAndRef }) => {
  const timerStore = useContext(TimerStore.Context);
  const isTimerRunning = timerStore.state.isRunning;
  const handleRemove = () =>
    window.confirm('タスクを削除します。よろしいですか？') && task.ref.delete();

  return (
    <TaskItemPresenter
      task={task}
      isTimerRunning={isTimerRunning}
      onRemove={handleRemove}
    />
  );
};

const TaskItemPresenter = ({
  task,
  isTimerRunning,
  onRemove,
}: {
  task: Task.Data & IdAndRef;
  isTimerRunning: boolean;
  onRemove: () => void;
}) => {
  const [showStopWatch, toggleShowStopWatch] = useToggle(false);

  return (
    <ListGroup.Item>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>{task.description}</div>
          <div className="flex space-x-2">
            {isTimerRunning ? (
              <>
                <ClockIcon className="h-6 w-6 cursor-not-allowed" />
                <TrashIcon className="h-6 w-6 cursor-not-allowed" />
              </>
            ) : (
              <>
                <ClockIcon
                  onClick={toggleShowStopWatch}
                  className="h-6 w-6 cursor-pointer"
                />
                <TrashIcon
                  onClick={onRemove}
                  className="h-6 w-6 cursor-pointer"
                />
              </>
            )}
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
