import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { differenceInMilliseconds } from 'date-fns';
import { zip } from 'ramda';
import { useContext } from 'react';
import { useToggle } from 'react-use';

import StopWatch from '../components/StopWatch';
import * as StopWatchContext from '../contexts/StopWatch';
import * as TasksContext from '../contexts/Tasks';
import { IdAndRef, Task } from '../models';

const TaskItem = ({ task }: { task: Task.Data & IdAndRef }) => {
  const offsetMilliseconds = zip(task.stopTimes, task.startTimes).reduce(
    (total, [stopTime, startTime]) =>
      total + differenceInMilliseconds(stopTime.toDate(), startTime.toDate()),
    0,
  );

  const { deleteTask, addStartTime, addStopTime, clearStartAndStopTimes } = useContext(
    TasksContext.Context,
  );

  const handleRemove = () => deleteTask(task.ref);
  const handleStart = () => addStartTime(task.ref);
  const handleStop = () => addStopTime(task.ref);
  const handleClear = () => clearStartAndStopTimes(task.ref);

  const [showStopWatch, toggleStopWatch] = useToggle(false);

  const { isRunning, taskWithOpen, setTaskWithOpen, setSeconds } = useContext(
    StopWatchContext.Context,
  );

  const isOtherStopWatchOpen = !!taskWithOpen && taskWithOpen.id !== task.id;
  const canToggleStopWatch = !isRunning && !isOtherStopWatchOpen;

  const canRemove = !showStopWatch || !isRunning;

  const handleToggleStopWatch = () => {
    if (showStopWatch) {
      toggleStopWatch(false);
      setTaskWithOpen(undefined);
      setSeconds(0);
    } else {
      toggleStopWatch(true);
      setTaskWithOpen({ id: task.id, description: task.description });
    }
  };

  return (
    <div className="px-4 py-3 border border-gray-200 rounded-md bg-white">
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>{task.description}</div>
          <div className="flex space-x-2">
            <button
              className={classNames(
                'focus:outline-none',
                !canToggleStopWatch && 'cursor-not-allowed',
              )}
              disabled={!canToggleStopWatch}
              onClick={handleToggleStopWatch}
            >
              <ClockIcon className="h-6 w-6" />
            </button>
            <button
              className={classNames('focus:outline-none', !canRemove && 'cursor-not-allowed')}
              onClick={handleRemove}
              disabled={!canRemove}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {showStopWatch && (
          <StopWatch
            offsetMilliseconds={offsetMilliseconds}
            onStart={handleStart}
            onStop={handleStop}
            onClear={handleClear}
          />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
