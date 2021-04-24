import React, { useState, useMemo } from "react";
import { zip } from "ramda";
import { differenceInSeconds, differenceInMilliseconds } from "date-fns";

export function useTimer() {
  const [running, setRunning] = useState(false);

  const [startedTimes, setStartedTimes] = useState<Date[]>([]);
  const [stoppedTimes, setStoppedTimes] = useState<Date[]>([]);

  const previousTotalSeconds = useMemo(
    () =>
      Math.floor(
        zip(startedTimes, stoppedTimes).reduce(
          (total, [startedTime, stoppedTime]) =>
            total + differenceInMilliseconds(stoppedTime, startedTime),
          0
        ) / 1000
      ),
    [startedTimes, stoppedTimes]
  );

  const {
    seconds: countingSeconds,
    start: startCouting,
    clear: clearCouting,
  } = useCountingSeconds();

  const totalSeconds = previousTotalSeconds + countingSeconds;

  const start = () => {
    setRunning(true);
    setStartedTimes((val) => [...val, new Date()]);
    startCouting();
  };
  const stop = () => {
    setRunning(false);
    setStoppedTimes((val) => [...val, new Date()]);
    clearCouting();
  };
  const clear = () => {
    setRunning(false);
    setStartedTimes([]);
    setStoppedTimes([]);
  };

  return {
    start,
    stop,
    clear,
    running,
    totalSeconds,
    countingSeconds,
    startedTimes,
    stoppedTimes,
  };
}

function useCountingSeconds() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startedTime, setStartedTime] = useState<Date>();
  const [coutingInstance, setCoutingInstance] = useState<NodeJS.Timeout>();
  const [
    adjustmentInstance,
    setAdjustmentInstance,
  ] = useState<NodeJS.Timeout>();

  const start = () => {
    if (running) return;
    setRunning(true);
    setStartedTime(new Date());
    setCoutingInstance(setInterval(() => setSeconds((val) => val + 1), 1000));
    setAdjustmentInstance(
      setInterval(
        () => setSeconds(differenceInSeconds(new Date(), startedTime as Date)),
        60 * 1000
      )
    );
  };

  const clear = () => {
    if (!running) return 0;
    setRunning(false);
    const totalSeconds = differenceInSeconds(new Date(), startedTime as Date);
    setStartedTime(undefined);
    clearInterval(coutingInstance as NodeJS.Timeout);
    setCoutingInstance(undefined);
    clearInterval(adjustmentInstance as NodeJS.Timeout);
    setAdjustmentInstance(undefined);
    setSeconds(0);
    return totalSeconds;
  };

  return {
    seconds,
    start,
    clear,
  };
}
