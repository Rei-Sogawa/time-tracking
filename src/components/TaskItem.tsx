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
  const handleRemove = () => task.ref.delete();

  const offsetMilliseconds = zip(task.stopTimes, task.startTimes).reduce(
    (total, [stopTime, startTime]) =>
      total + differenceInMilliseconds(stopTime.toDate(), startTime.toDate()),
    0,
  );

  const { addStartTime, addStopTime, clearStartAndStopTimes } = useContext(TasksContext.Context);

  const handleStart = () => addStartTime(task.ref);
  const handleStop = () => addStopTime(task.ref);
  const handleClear = () => clearStartAndStopTimes(task.ref);

  const [showStopWatch, toggleStopWatch] = useToggle(false);

  const { isRunning, taskIdWithOpen, setTaskIdWithOpen } = useContext(StopWatchContext.Context);
  const isOtherStopWatchOpen = !!taskIdWithOpen && taskIdWithOpen !== task.id;
  const canToggleStopWatch = !isRunning && !isOtherStopWatchOpen;

  const handleToggleStopWatch = () => {
    if (showStopWatch) {
      toggleStopWatch(false);
      setTaskIdWithOpen(undefined);
    } else {
      toggleStopWatch(true);
      setTaskIdWithOpen(task.id);
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
            <button className="focus:outline-none" onClick={handleRemove}>
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
