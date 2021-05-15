import 'firebase/firestore';

import { differenceInMilliseconds } from 'date-fns';
import firebase from 'firebase/app';
import { zip } from 'ramda';
import { useCallback, useContext, useEffect } from 'react';

import Button from '../basics/Button';
import { Context as stopWatchContext } from '../contexts/stopWatch';
import { useStopWatch } from '../hooks/useStopWatch';
import { IdAndRef, Task } from '../models';
import { convertSeconds } from '../utils/convertSeconds';

const StopWatchContainer = ({ task }: { task: Task.Data & IdAndRef }) => {
  const { setState: setStopWatchContextState } = useContext(stopWatchContext);

  const offsetMilliseconds = zip(task.startTimes, task.stopTimes).reduce(
    (sum, [startTime, stopTime]) =>
      sum + differenceInMilliseconds(stopTime.toDate(), startTime.toDate()),
    0,
  );
  const offsetSeconds = Math.floor(offsetMilliseconds / 1000);

  const handleStart = () => {
    task.ref.update({
      startTimes: firebase.firestore.FieldValue.arrayUnion(
        firebase.firestore.Timestamp.now(),
      ),
    });
    setStopWatchContextState((prev) => ({ ...prev, isRunning: true }));
  };

  const handleStop = () => {
    task.ref.update({
      stopTimes: firebase.firestore.FieldValue.arrayUnion(
        firebase.firestore.Timestamp.now(),
      ),
    });
    setStopWatchContextState((prev) => ({ ...prev, isRunning: false }));
  };

  const handleClear = () => {
    task.ref.update({
      startTimes: [],
      stopTimes: [],
    });
    setStopWatchContextState((prev) => ({
      ...prev,
      isRunning: false,
      seconds: 0,
    }));
  };

  const handleChangeSeconds = useCallback((value: number) => {
    setStopWatchContextState((prev) => ({ ...prev, seconds: value }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StopWatchPresenter
      offsetSeconds={offsetSeconds}
      onStart={handleStart}
      onStop={handleStop}
      onClear={handleClear}
      onChangeSeconds={handleChangeSeconds}
    />
  );
};

const StopWatchPresenter = ({
  offsetSeconds,
  onStart,
  onStop,
  onClear,
  onChangeSeconds,
}: {
  offsetSeconds: number;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onChangeSeconds: (value: number) => void;
}) => {
  const {
    seconds: totalSeconds,
    isRunning,
    start,
    stop,
    clear,
  } = useStopWatch({
    offsetSeconds,
  });

  const { seconds, minutes, hours } = convertSeconds(totalSeconds);

  const displayedSeconds = String(seconds).padStart(2, '0');
  const displayedMinutes = String(minutes).padStart(2, '0');
  const displayedHours = String(hours).padStart(2, '0');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeSeconds(totalSeconds), [totalSeconds]);

  const handleStart = () => {
    start();
    onStart();
  };
  const handleStop = () => {
    stop();
    onStop();
  };
  const handleClear = () => {
    clear();
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

export default StopWatchContainer;
