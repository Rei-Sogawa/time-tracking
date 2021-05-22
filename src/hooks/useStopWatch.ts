import { getTime } from 'date-fns';
import { useState } from 'react';
import { useInterval } from 'react-use';

type State = {
  offsetMilliseconds: number;
  runningMilliseconds: number;
  startTimestamp: number | undefined;
};

const useStopWatch = (
  option: undefined | { offsetMilliseconds: number } = { offsetMilliseconds: 0 }
) => {
  const [state, setState] = useState<State>({
    offsetMilliseconds: option.offsetMilliseconds,
    runningMilliseconds: 0,
    startTimestamp: undefined,
  });

  const seconds = Math.floor(
    (state.offsetMilliseconds + state.runningMilliseconds) / 1000
  );
  const isRunning = !!state.startTimestamp;

  const start = () => {
    if (isRunning) return;
    const date = new Date();
    setState((prev) => ({ ...prev, startTimestamp: getTime(date) }));
  };

  const count = () => {
    if (!isRunning) return;
    const date = new Date();
    const currentTimestamp = getTime(date);
    const runningMilliseconds = currentTimestamp - state.startTimestamp!;
    setState((prev) => ({ ...prev, runningMilliseconds }));
  };

  const pause = () => {
    if (!isRunning) return;
    setState((prev) => ({
      ...prev,
      offsetMilliseconds: prev.offsetMilliseconds + prev.runningMilliseconds,
      runningMilliseconds: 0,
      startTimestamp: undefined,
    }));
  };

  const reset = (offsetMilliseconds: number | undefined = 0) => {
    if (isRunning) return;
    setState((prev) => ({
      ...prev,
      offsetMilliseconds,
      runningMilliseconds: 0,
    }));
  };

  useInterval(
    () => {
      count();
    },
    isRunning ? 1000 : null
  );

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
  };
};

export default useStopWatch;
