import { differenceInMilliseconds } from 'date-fns';
import { useState } from 'react';
import { useInterval, useToggle } from 'react-use';

const useStopWatch = (options: { offsetSeconds?: number }) => {
  const [isRunning, toggleIsRunning] = useToggle(false);
  const [startTime, setStartTime] = useState<Date>();
  const [runningMilliseconds, setRunningMilliseconds] = useState(0);
  const [offsetMilliseconds, setOffsetMilliseconds] = useState(
    options.offsetSeconds ? options.offsetSeconds * 1000 : 0,
  );

  const milliseconds = offsetMilliseconds + runningMilliseconds;
  const seconds = Math.floor(milliseconds / 1000);

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
      setRunningMilliseconds(0);
      setOffsetMilliseconds(
        (prev) =>
          prev + differenceInMilliseconds(new Date(), startTime as Date),
      );
    }
  };
  const clear = () => {
    if (!isRunning && milliseconds) {
      setStartTime(undefined);
      setStartTime(undefined);
      setRunningMilliseconds(0);
      setOffsetMilliseconds(0);
    }
  };

  useInterval(
    () =>
      setRunningMilliseconds(
        differenceInMilliseconds(new Date(), startTime as Date),
      ),
    isRunning ? 1000 : null,
  );

  return { isRunning, seconds, start, stop, clear };
};

export { useStopWatch };
