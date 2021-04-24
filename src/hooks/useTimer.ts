import { useState, useMemo } from "react";
import { zip } from "ramda";
import { differenceInSeconds, differenceInMilliseconds } from "date-fns";

export function useTimer({
  pastRecords = { startedTimeRecords: [], stoppedTimeRecords: [] },
}: {
  pastRecords?: { startedTimeRecords: Date[]; stoppedTimeRecords: Date[] };
}) {
  const [running, setRunning] = useState(false);

  const [startedTimeRecords, setStartedTimeRecords] = useState<Date[]>(
    pastRecords.startedTimeRecords
  );
  const [stoppedTimeRecords, setStoppedTimeRecords] = useState<Date[]>(
    pastRecords.stoppedTimeRecords
  );

  const previousTotalSeconds = useMemo(
    () =>
      Math.floor(
        zip(startedTimeRecords, stoppedTimeRecords).reduce(
          (total, [startedTime, stoppedTime]) =>
            total + differenceInMilliseconds(stoppedTime, startedTime),
          0
        ) / 1000
      ),
    [startedTimeRecords, stoppedTimeRecords]
  );

  const {
    seconds: countingSeconds,
    start: startCouting,
    clear: clearCouting,
  } = useCountingSeconds();

  const totalSeconds = previousTotalSeconds + countingSeconds;

  const start = () => {
    setRunning(true);
    setStartedTimeRecords((val) => [...val, new Date()]);
    startCouting();
  };
  const stop = () => {
    setRunning(false);
    setStoppedTimeRecords((val) => [...val, new Date()]);
    clearCouting();
  };
  const clear = () => {
    setRunning(false);
    setStartedTimeRecords([]);
    setStoppedTimeRecords([]);
  };

  return {
    start,
    stop,
    clear,
    running,
    totalSeconds,
    countingSeconds,
    startedTimeRecords,
    stoppedTimeRecords,
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
    const _startedTime = new Date();
    setRunning(true);
    setStartedTime(_startedTime);
    setCoutingInstance(setInterval(() => setSeconds((val) => val + 1), 1000));
    setAdjustmentInstance(
      setInterval(
        () => setSeconds(differenceInSeconds(new Date(), _startedTime)),
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
