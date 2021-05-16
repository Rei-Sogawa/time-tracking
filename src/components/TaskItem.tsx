import { TrashIcon } from '@heroicons/react/outline';
import { differenceInMilliseconds } from 'date-fns';
import { zip } from 'ramda';
import { useContext } from 'react';

import StopWatch from '../components/StopWatch';
import * as TasksContext from '../contexts/Tasks';
import { IdAndRef, Task } from '../models';

const TaskItem = ({ task }: { task: Task.Data & IdAndRef }) => {
  const handleRemove = () => task.ref.delete();

  const offsetMilliseconds = zip(task.stopTimes, task.startTimes).reduce(
    (total, [stopTime, startTime]) =>
      total + differenceInMilliseconds(stopTime.toDate(), startTime.toDate()),
    0,
  );

  const { addStartTime, addStopTime, clearStartAndStopTimes } = useContext(
    TasksContext.Context,
  );

  const handleStart = () => {
    return addStartTime({ taskRef: task.ref, prevStartTimes: task.startTimes });
  };
  const handleStop = () => {
    return addStopTime({ taskRef: task.ref, prevStopTimes: task.stopTimes });
  };
  const handleClear = () => {
    return clearStartAndStopTimes(task.ref);
  };

  return (
    <div className="px-4 py-3 border border-gray-200 rounded-md bg-white">
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>{task.description}</div>
          <div className="flex">
            <TrashIcon
              onClick={handleRemove}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
          <StopWatch
            offsetMilliseconds={offsetMilliseconds}
            onStart={handleStart}
            onStop={handleStop}
            onClear={handleClear}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
