import React, { createContext, useReducer } from 'react';

type State = {
  isRunning: boolean;
  seconds: number;
};

type Action =
  | { type: 'SET_IS_RUNNING'; payload: Pick<State, 'isRunning'> }
  | { type: 'SET_SECONDS'; payload: Pick<State, 'seconds'> };

const initialState: State = {
  isRunning: false,
  seconds: 0,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_IS_RUNNING':
      return { ...state, isRunning: action.payload.isRunning };
    case 'SET_SECONDS':
      return { ...state, seconds: action.payload.seconds };
    default:
      return state;
  }
};

export const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
