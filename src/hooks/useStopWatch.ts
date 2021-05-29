import { getTime } from 'date-fns';
import { useReducer } from 'react';
import { useInterval } from 'react-use';

type State = {
  offsetMilliseconds: number;
  runningMilliseconds: number;
  startTimestamp: number | undefined;
};

type Action =
  | {
      type: 'start';
      payload: Date;
    }
  | {
      type: 'count';
      payload: Date;
    }
  | {
      type: 'pause';
    }
  | { type: 'init'; payload: number };

const reducer = (state: State, action: Action): State => {
  const isRunning = typeof state.startTimestamp === 'number';

  switch (action.type) {
    case 'start': {
      if (isRunning) return state;
      return { ...state, startTimestamp: getTime(action.payload) };
    }
    case 'count': {
      if (!isRunning) return state;
      const runningMilliseconds =
        getTime(action.payload) - (state.startTimestamp as number);
      return {
        ...state,
        runningMilliseconds,
      };
    }
    case 'pause': {
      if (!isRunning) return state;
      return {
        ...state,
        offsetMilliseconds:
          state.offsetMilliseconds + state.runningMilliseconds,
        runningMilliseconds: 0,
        startTimestamp: undefined,
      };
    }
    case 'init': {
      if (isRunning) return state;
      return {
        ...state,
        offsetMilliseconds: action.payload,
        runningMilliseconds: 0,
        startTimestamp: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

const useStopWatch = (arg?: { offsetMilliseconds?: number }) => {
  const [state, dispatch] = useReducer(
    reducer,
    arg?.offsetMilliseconds,
    (offsetMilliseconds) => ({
      offsetMilliseconds: offsetMilliseconds || 0,
      runningMilliseconds: 0,
      startTimestamp: undefined,
    })
  );

  const isRunning = state.startTimestamp;
  const seconds = Math.floor(
    (state.offsetMilliseconds + state.runningMilliseconds) / 1000
  );

  const start = () => {
    dispatch({ type: 'start', payload: new Date() });
  };

  const count = () => {
    dispatch({ type: 'count', payload: new Date() });
  };

  const pause = () => {
    dispatch({ type: 'pause' });
  };

  const init = (offsetMillisecond?: number) => {
    dispatch({ type: 'init', payload: offsetMillisecond || 0 });
  };

  useInterval(
    () => {
      count();
    },
    isRunning ? 1000 : null
  );

  return {
    seconds,
    isRunning,
    start,
    pause,
    init,
  };
};

export default useStopWatch;
