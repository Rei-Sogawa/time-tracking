import React, { useState } from 'react';
import Field from './basics/field';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Timer from './components/Timer';

const App = () => {
  const [startTimes, setStartTimes] = useState<Date[]>([]);
  const [stopTimes, setStopTimes] = useState<Date[]>([]);

  const handleStart = () => setStartTimes((val) => [...val, new Date()]);
  const handleStop = () => setStopTimes((val) => [...val, new Date()]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto py-5 max-w-screen-md">
        <Timer
          startTimes={startTimes}
          stopTimes={stopTimes}
          handleStart={handleStart}
          handleStop={handleStop}
        />
        <TaskForm />
      </div>
    </div>
  );
};

export default App;

type TaskFormValues = {
  description?: string;
  category?: string;
};

const taskFormSchema = yup.object().shape({
  description: yup.string().nullable(),
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
          <Field {...register('description')} placeholder="description" />
        </div>
      </div>
      {/* react-hook-form は type="submit" の button か input が form 内にないと enter で submit できない */}
      <button type="submit" />
    </form>
  );
};
