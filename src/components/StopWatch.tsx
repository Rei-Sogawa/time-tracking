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

  const { seconds, minutes, hours } = convertSeconds(totalSeconds);

  const displayedSeconds = String(seconds).padStart(2, '0');
  const displayedMinutes = String(minutes).padStart(2, '0');
  const displayedHours = String(hours).padStart(2, '0');

  const { setState: setStopWatchContextState } = useContext(
    StopWatchContext.Context,
  );
  useEffect(
    () =>
      setStopWatchContextState((prev) => ({ ...prev, seconds: totalSeconds })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalSeconds],
  );

  const handleStart = () => {
    start();
    setStopWatchContextState((prev) => ({ ...prev, isRunning: true }));
    onStart();
  };
  const handleStop = () => {
    stop();
    setStopWatchContextState((prev) => ({ ...prev, isRunning: true }));
    onStop();
  };
  const handleClear = () => {
    clear();
    setStopWatchContextState((prev) => ({ ...prev, seconds: 0 }));
    onClear();
  };

  return (
    <div className="space-y-3">
      <div className="text-center font-mono text-3xl">
        {displayedHours}:{displayedMinutes}:{displayedSeconds}
      </div>
      <div className="flex justify-center">
        <div className="flex space-x-3">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            size="xsm"
            color="white"
          >
            START
          </Button>
          <Button
            onClick={handleStop}
            disabled={!isRunning}
            size="xsm"
            color="white"
          >
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
