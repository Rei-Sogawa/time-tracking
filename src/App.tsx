import React, { useMemo, useState } from 'react';
import Button from './basics/button';
import Field from './basics/field';
import { useTimer } from './hooks/useTimer';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { zip } from 'ramda';
import { differenceInMilliseconds } from 'date-fns';

const App = () => {
  const [startTimes, setStartTimes] = useState<Date[]>([]);
  const [stopTimes, setStopTimes] = useState<Date[]>([]);

  const secondsSoFar = useMemo(() => {
    const milliseconds = zip(startTimes, stopTimes).reduce(
      (sum, [startTime, stopTime]) =>
        sum + differenceInMilliseconds(stopTime, startTime),
      0
    );
    return Math.floor(milliseconds / 1000);
  }, [startTimes, stopTimes]);

  const handleStart = () => setStartTimes((val) => [...val, new Date()]);
  const handleStop = () => setStopTimes((val) => [...val, new Date()]);
  const handleClear = () => {
    setStartTimes([]);
    setStopTimes([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto py-5 max-w-screen-md">
        <Timer
          secondsSoFar={secondsSoFar}
          handleStart={handleStart}
          handleStop={handleStop}
          handleClear={handleClear}
        />
        <TaskForm />
      </div>
    </div>
  );
};

export default App;

const Timer = ({
  secondsSoFar,
  handleStart,
  handleStop,
  handleClear,
}: {
  secondsSoFar: number;
  handleStart: () => void;
  handleStop: () => void;
  handleClear: () => void;
}) => {
  const {
    isRunning,
    seconds: runningSeconds,
    start,
    finish,
    clear,
  } = useTimer();

  const totalSeconds = secondsSoFar + runningSeconds;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const displayedMinutes = String(minutes).padStart(2, '0');
  const displayedSeconds = String(seconds).padStart(2, '0');

  const canStart = !isRunning;
  const canStop = isRunning;
  const canClear = !isRunning && !!totalSeconds;

  const handleClickStart = () => {
    if (canStart) {
      handleStart();
      start();
    }
  };
  const handleClickStop = () => {
    if (canStop) {
      handleStop();
      finish();
      clear();
    }
  };
  const handleClickClear = () => {
    if (canClear) {
      handleClear();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center font-lg text-5xl font-mono">
        {displayedMinutes}:{displayedSeconds}
      </div>
      <div className="flex justify-center">
        <div className="flex space-x-3">
          <Button onClick={handleClickStart} disabled={!canStart}>
            START
          </Button>
          <Button onClick={handleClickStop} disabled={!canStop}>
            STOP
          </Button>
          <Button onClick={handleClickClear} disabled={!canClear}>
            CLEAR
          </Button>
        </div>
      </div>
    </div>
  );
};

type TaskFormValues = {
  title?: string;
  category?: string;
};

const taskFormSchema = yup.object().shape({
  title: yup.string().nullable(),
  category: yup.string().nullable(),
});

const TaskForm = ({ defaultValues }: { defaultValues?: TaskFormValues }) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(taskFormSchema),
    defaultValues,
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-3">
        <div className="w-32">
          <Field {...register('category')} placeholder="category" />
        </div>
        <div className="flex-1">
          <Field {...register('title')} placeholder="title" />
        </div>
      </div>
      {/* react-hook-form は type="submit" の button か input が form 内にないと enter で submit できない */}
      <button type="submit" />
    </form>
  );
};
