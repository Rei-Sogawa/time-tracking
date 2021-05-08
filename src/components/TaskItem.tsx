import * as Task from '../models/task';
import ListGroup from '../basics/ListGroup';
import { ClockIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import Timer from '../components/Timer';
import { useToggle } from 'react-use';
import classNames from 'classnames';

type Props = {
  task: Task.Data;
};

const TaskItem = ({ task }: Props) => {
  const [showsTimer, toggleShowsTimer] = useToggle(false);
  const [isTimerRunning, toggleIsTimerRunning] = useToggle(false);

  const canToggleTimer = !isTimerRunning;
  const handleClickTimer = () => {
    if (!canToggleTimer) return;
    toggleShowsTimer();
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
              !canToggleTimer && 'cursor-not-allowed opacity-50'
            )}
            disabled={!canToggleTimer}
          >
            <ClockIcon className="h-6 w-6" onClick={handleClickTimer} />
          </button>
        </div>
        {showsTimer && (
          <>
            <hr />
            <Timer
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
