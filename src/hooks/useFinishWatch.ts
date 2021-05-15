import { differenceInSeconds } from 'date-fns';
import { useState } from 'react';
import { useInterval } from 'react-use';

const useFinishWatch = () => {
  const [startTime, setStartTime] = useState<Date>();
  const [finishTime, setFinishTime] = useState<Date>();
  const [seconds, setSeconds] = useState(0);

  const hasStarted = !!startTime;
  const hasFinished = !!finishTime;
  const isRunning = hasStarted && !hasFinished;

  const start = () => {
    if (!isRunning) {
      setStartTime(new Date());
    }
  };
  const finish = () => {
    if (isRunning) {
      setFinishTime(new Date());
    }
  };
  const clear = () => {
    setStartTime(undefined);
    setFinishTime(undefined);
    setSeconds(0);
  };

  useInterval(
    () => setSeconds(differenceInSeconds(new Date(), startTime as Date)),
    isRunning ? 1000 : null
  );

  return { isRunning, seconds, start, finish, clear };
};

export { useFinishWatch };
