import React, { createContext, useState } from 'react';

type State = {
  isRunning: boolean;
  seconds: number;
  taskId: undefined | string;
};

type Values = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const initialState = {
  isRunning: false,
  seconds: 0,
  taskId: undefined,
};

export const Context = createContext<Values>({
  state: initialState,
  setState: () => {},
});

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};
