import React, { createContext, useState } from 'react';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Values = {
  isRunning: boolean;
  setIsRunning: SetState<boolean>;
  seconds: number;
  setSeconds: SetState<number>;
  taskIdWithOpen: undefined | string;
  setTaskIdWithOpen: SetState<undefined | string>;
};

export const Context = createContext<Values>({} as Values);

export const Provider: React.FC<{}> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [taskIdWithOpen, setTaskIdWithOpen] = useState<string>();

  const values: Values = {
    isRunning,
    setIsRunning,
    seconds,
    setSeconds,
    taskIdWithOpen,
    setTaskIdWithOpen,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
