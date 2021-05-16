import React, { createContext, useState } from 'react';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Values = {
  isRunning: boolean;
  setIsRunning: SetState<boolean>;
  seconds: number;
  setSeconds: SetState<number>;
  taskWithOpen: { id: string; description: string } | undefined;
  setTaskWithOpen: SetState<{ id: string; description: string } | undefined>;
};

export const Context = createContext<Values>({} as Values);

export const Provider: React.FC<{}> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [taskWithOpen, setTaskWithOpen] =
    useState<{ id: string; description: string } | undefined>();

  const values: Values = {
    isRunning,
    setIsRunning,
    seconds,
    setSeconds,
    taskWithOpen,
    setTaskWithOpen,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
