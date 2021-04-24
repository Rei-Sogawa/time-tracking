import { differenceInMilliseconds, differenceInSeconds } from "date-fns";
import { zip } from "ramda";
import { useMemo, useState } from "react";

export function useTimer({
  pastRecords = { startTimeRecords: [], stopTimeRecords: [] },
}: {
  pastRecords?: { startTimeRecords: Date[]; stopTimeRecords: Date[] };
}) {
  const [running, setRunning] = useState(false);

  const [startTimeRecords, setstartTimeRecords] = useState<Date[]>(
    pastRecords.startTimeRecords
  );
  const [stopTimeRecords, setstopTimeRecords] = useState<Date[]>(
    pastRecords.stopTimeRecords
  );

  const previousTotalSeconds = useMemo(
    () =>
      Math.floor(
        zip(startTimeRecords, stopTimeRecords).reduce(
          (total, [startTime, stopTime]) =>
            total + differenceInMilliseconds(stopTime, startTime),
          0
        ) / 1000
      ),
    [startTimeRecords, stopTimeRecords]
  );

  const {
    seconds: countingSeconds,
    start: startCouting,
    clear: clearCouting,
  } = useCountingSeconds();

  const totalSeconds = previousTotalSeconds + countingSeconds;

  const start = () => {
    setRunning(true);
    setstartTimeRecords((val) => [...val, new Date()]);
    startCouting();
  };
  const stop = () => {
    setRunning(false);
    setstopTimeRecords((val) => [...val, new Date()]);
    clearCouting();
  };
  const clear = () => {
    setRunning(false);
    setstartTimeRecords([]);
    setstopTimeRecords([]);
  };

  return {
    start,
    stop,
    clear,
    running,
    totalSeconds,
    countingSeconds,
    startTimeRecords,
    stopTimeRecords,
  };
}

function useCountingSeconds() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setstartTime] = useState<Date>();
  const [coutingInstance, setCoutingInstance] = useState<NodeJS.Timeout>();
  const [
    adjustmentInstance,
    setAdjustmentInstance,
  ] = useState<NodeJS.Timeout>();

  const start = () => {
    if (running) return;
    const _startTime = new Date();
    setRunning(true);
    setstartTime(_startTime);
    setCoutingInstance(setInterval(() => setSeconds((val) => val + 1), 1000));
    setAdjustmentInstance(
      setInterval(
        () => setSeconds(differenceInSeconds(new Date(), _startTime)),
        60 * 1000
      )
    );
  };

  const clear = () => {
    if (!running) return 0;
    setRunning(false);
    const totalSeconds = differenceInSeconds(new Date(), startTime as Date);
    setstartTime(undefined);
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
