import differenceInMilliseconds from 'date-fns/esm/fp/differenceInMilliseconds/index.js';
import { zip } from 'ramda';
import { useMemo } from 'react';
import { useTimer } from '../hooks/useTimer';
import Button from '../basics/button';

type Props = {
  startTimes: Date[];
  stopTimes: Date[];
  handleStart: () => void;
  handleStop: () => void;
};

const Timer = ({ startTimes, stopTimes, handleStart, handleStop }: Props) => {
  const {
    isRunning,
    seconds: runningSeconds,
    start,
    finish,
    clear,
  } = useTimer();

  const secondsSoFar = useMemo(() => {
    const milliseconds = zip(startTimes, stopTimes).reduce(
      (total, [startTime, stopTime]) =>
        total + differenceInMilliseconds(startTime, stopTime),
      0
    );
    return Math.floor(milliseconds / 1000);
  }, [startTimes, stopTimes]);

  const totalSeconds = secondsSoFar + runningSeconds;

  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor(totalSeconds / 60) - hours * 60;
  const seconds = Math.floor(totalSeconds % 60);

  const displayedHours = String(hours).padStart(2, '0');
  const displayedMinutes = String(minutes).padStart(2, '0');
  const displayedSeconds = String(seconds).padStart(2, '0');

  const canStart = !isRunning;
  const canStop = isRunning;

  const handleClickStart = () => {
    if (!canStart) return;
    start();
    handleStart();
  };

  const handleClickStop = () => {
    if (!canStop) return;
    finish();
    clear();
    handleStop();
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center font-mono">
        {displayedHours}:{displayedMinutes}:{displayedSeconds}
      </div>
      <div className="flex justify-center">
        <div className="flex space-x-3">
          <Button onClick={handleClickStart} disabled={!canStart} size="sm">
            START
          </Button>
          <Button onClick={handleClickStop} disabled={!canStop} size="sm">
            STOP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
