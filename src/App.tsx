import { CssBaseline } from '@material-ui/core';

import useStopWatch from './hooks/useStopWatch';

function App() {
  const { seconds, start, pause, reset } = useStopWatch();

  return (
    <div>
      <CssBaseline />
      <div>{seconds}</div>
      <button onClick={start}>START</button>
      <button onClick={pause}>PAUSE</button>
      <button onClick={() => reset()}>RESET</button>
    </div>
  );
}

export default App;
