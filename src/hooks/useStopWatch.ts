import { differenceInSeconds } from 'date-fns';
import { useState } from 'react';
import { useInterval, useToggle } from 'react-use';

const useStopWatch = (options: { offsetSeconds?: number }) => {
  const [isRunning, toggleIsRunning] = useToggle(false);
  const [startTime, setStartTime] = useState<Date>();
  const [runningSeconds, setRunningSeconds] = useState(0);
  const [offsetSeconds, setOffsetSeconds] = useState(
    options.offsetSeconds || 0,
  );

  const seconds = offsetSeconds + runningSeconds;

  const start = () => {
    if (!isRunning) {
      toggleIsRunning(true);
      setStartTime(new Date());
    }
  };
  const stop = () => {
    if (isRunning) {
      toggleIsRunning(false);
      setStartTime(undefined);
      setRunningSeconds(0);
      setOffsetSeconds(
        (prev) => prev + differenceInSeconds(new Date(), startTime as Date),
      );
    }
  };
  const clear = () => {
    if (!isRunning && seconds) {
      setStartTime(undefined);
      setStartTime(undefined);
      setRunningSeconds(0);
      setOffsetSeconds(0);
    }
  };

  useInterval(
    () => setRunningSeconds(differenceInSeconds(new Date(), startTime as Date)),
    isRunning ? 1000 : null,
  );

  return { isRunning, seconds, start, stop, clear };
};

export { useStopWatch };
