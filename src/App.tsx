import React, { useState } from 'react';
import Timer from './components/Timer';
import TaskForm from './components/TaskForm';

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
        <TaskForm
          handleSubmit={(values) => {
            console.log(values);
          }}
        />
      </div>
    </div>
  );
};

export default App;
