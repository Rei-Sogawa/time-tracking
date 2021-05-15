import ListGroup from '../basics/ListGroup';
import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import StopWatch from './StopWatch';
import { useToggle } from 'react-use';
import classNames from 'classnames';
import { Task, IdAndRef } from '../models';

type Props = {
  task: Task.Data & IdAndRef;
};

const TaskItem = ({ task }: Props) => {
  const [showStopWatch, toggleShowStopWatch] = useToggle(false);
  const [isTimerRunning, toggleIsTimerRunning] = useToggle(false);

  const handleClickShowStopWatch = () => {
    if (isTimerRunning) return;
    toggleShowStopWatch();
  };

  const [startTimes, setStartTimes] = useState<Date[]>([]);
  const [stopTimes, setStopTimes] = useState<Date[]>([]);

  const handleStart = () => {
    setStartTimes((val) => [...val, new Date()]);
    toggleIsTimerRunning();
  };
  const handleStop = () => {
    setStopTimes((val) => [...val, new Date()]);
    toggleIsTimerRunning();
  };

  return (
    <ListGroup.Item>
      <div className="flex-col space-y-3">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox" />
            <div>{task.description}</div>
          </div>
          <button
            className={classNames(
              'focus:outline-none',
              isTimerRunning && 'cursor-not-allowed opacity-50',
            )}
            disabled={isTimerRunning}
          >
            <div className="flex space-x-1">
              <ClockIcon
                className="h-6 w-6"
                onClick={handleClickShowStopWatch}
              />
              <TrashIcon
                className="h-6 w-6"
                onClick={() => task.ref.delete()}
              />
            </div>
          </button>
        </div>
        {showStopWatch && (
          <>
            <hr />
            <StopWatch
              startTimes={startTimes}
              stopTimes={stopTimes}
              handleStart={handleStart}
              handleStop={handleStop}
            />
          </>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default TaskItem;
