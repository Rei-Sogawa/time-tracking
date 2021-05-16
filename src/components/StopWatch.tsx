import 'firebase/firestore';

import { useContext, useEffect } from 'react';

import Button from '../basics/Button';
import * as StopWatchContext from '../contexts/StopWatch';
import { useStopWatch } from '../hooks/useStopWatch';
import { convertSeconds } from '../utils/convertSeconds';

const StopWatch = ({
  offsetMilliseconds,
  onStart,
  onStop,
  onClear,
}: {
  offsetMilliseconds: number;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
}) => {
  const {
    seconds: totalSeconds,
    isRunning,
    start,
    stop,
    clear,
  } = useStopWatch({
    offsetMilliseconds,
  });

  const { formattedTime } = convertSeconds(totalSeconds);

  const { setIsRunning, setSeconds } = useContext(StopWatchContext.Context);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setSeconds(totalSeconds), [totalSeconds]);

  const handleStart = () => {
    start();
    setIsRunning(true);
    onStart();
  };
  const handleStop = () => {
    stop();
    setIsRunning(false);
    onStop();
  };
  const handleClear = () => {
    clear();
    setSeconds(0);
    onClear();
  };

  return (
    <div className="space-y-3">
      <div className="text-center font-mono text-3xl">{formattedTime}</div>
      <div className="flex justify-center">
        <div className="flex space-x-3">
          <Button onClick={handleStart} disabled={isRunning} size="xsm" color="white">
            START
          </Button>
          <Button onClick={handleStop} disabled={!isRunning} size="xsm" color="white">
            STOP
          </Button>
          <Button
            onClick={handleClear}
            disabled={isRunning || !totalSeconds}
            size="xsm"
            color="white"
          >
            CLEAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
