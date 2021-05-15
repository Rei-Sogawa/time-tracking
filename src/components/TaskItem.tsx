import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { useToggle } from 'react-use';

import { Context as stopWatchContext } from '../contexts/stopWatch';
import { IdAndRef, Task } from '../models';
import StopWatch from './StopWatch';

const TaskItemContainer = ({ task }: { task: Task.Data & IdAndRef }) => {
  const handleRemove = () =>
    window.confirm('タスクを削除します。よろしいですか？') && task.ref.delete();

  const { state: stopWatchContextState, setState: setStopWatchContextState } =
    useContext(stopWatchContext);

  const isTimerRunning = stopWatchContextState.isRunning;
  const isOtherStopWatchOpen =
    stopWatchContextState.taskId === task.id ||
    stopWatchContextState.taskId === undefined
      ? false
      : true;

  const handleToggleShowStopWatch = (show: boolean) => {
    setStopWatchContextState((prev) => ({
      ...prev,
      taskId: show ? task.id : undefined,
    }));
  };

  return (
    <TaskItemPresenter
      task={task}
      isTimerRunning={isTimerRunning}
      isOtherStopWatchOpen={isOtherStopWatchOpen}
      onToggleShowStopWatch={handleToggleShowStopWatch}
      onRemove={handleRemove}
    />
  );
};

const TaskItemPresenter = ({
  task,
  isTimerRunning,
  isOtherStopWatchOpen,
  onToggleShowStopWatch,
  onRemove,
}: {
  task: Task.Data & IdAndRef;
  isTimerRunning: boolean;
  isOtherStopWatchOpen: boolean;
  onToggleShowStopWatch: (show: boolean) => void;
  onRemove: () => void;
}) => {
  const [showStopWatch, toggleShowStopWatch] = useToggle(false);

  const handleToggleShowStopWatch = () => {
    toggleShowStopWatch(!showStopWatch);
    onToggleShowStopWatch(!showStopWatch);
  };

  return (
    <div className="px-4 py-3 border border-gray-200 rounded-md bg-white">
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>{task.description}</div>
          <div className="flex space-x-2">
            {isTimerRunning || isOtherStopWatchOpen ? (
              <ClockIcon className="h-6 w-6 cursor-not-allowed" />
            ) : (
              <ClockIcon
                onClick={handleToggleShowStopWatch}
                className="h-6 w-6 cursor-pointer"
              />
            )}
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
    </div>
  );
};

export default TaskItemContainer;
