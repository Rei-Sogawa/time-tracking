import { createContext, FC, useContext, useState } from 'react';

type State = {
  isRunning: boolean;
};

type Action = {
  start: () => void;
  pause: () => void;
};

type Value = { state: State; action: Action };

const StopWatchContext = createContext<Value | undefined>(undefined);

const StopWatchProvider: FC = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);

  const value: Value = {
    state: { isRunning },
    action: { start, pause },
  };

  return (
    <StopWatchContext.Provider value={value}>
      {children}
    </StopWatchContext.Provider>
  );
};

function useStopWatch() {
  const context = useContext(StopWatchContext);
  if (!context) throw new Error();
  return context;
}

export { StopWatchProvider, useStopWatch };
