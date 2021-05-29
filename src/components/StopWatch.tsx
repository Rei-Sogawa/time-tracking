import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC, useEffect } from 'react';
import { useTitle } from 'react-use';

import { useTasks } from '../contexts/tasks';
import useStopWatch from '../hooks/useStopWatch';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StopWatch: FC = () => {
  const {
    state: { taskIdBeingFocused },
    selector: { taskBeingFocused },
  } = useTasks();

  const {
    seconds: totalSeconds,
    isRunning,
    start,
    pause,
    init,
  } = useStopWatch();

  useEffect(() => {
    init(
      taskBeingFocused ? taskBeingFocused.requiredSeconds * 1000 : undefined
    );
    // taskBeingFocused を watch すると、deepWatch で動いてしまうので
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskIdBeingFocused]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');
  const displayStopWatchTime = `${displayMinutes}:${displaySeconds}`;

  useTitle(taskBeingFocused ? displayStopWatchTime : 'Time Logger');

  const handleClickStart = () => {
    start();
  };

  const handleClickPause = () => {
    if (taskBeingFocused) {
      taskBeingFocused.ref.update({ requiredSeconds: totalSeconds });
    }
    pause();
  };

  const handleClickClear = () => {
    if (taskBeingFocused) {
      if (!window.confirm('タイマーを初期化します。よろしいですか？')) return;
      taskBeingFocused.ref.update({ requiredSeconds: 0 });
    }
    init();
  };

  const classes = useStyles();

  return (
    <>
      <Typography align="center" variant="h1">
        {displayStopWatchTime}
      </Typography>
      {taskBeingFocused && (
        <Typography align="center">{taskBeingFocused.description}</Typography>
      )}
      <div className={classes.buttons}>
        <Button
          variant="contained"
          onClick={handleClickStart}
          disabled={isRunning}
        >
          START
        </Button>
        <Button
          variant="contained"
          onClick={handleClickPause}
          disabled={!isRunning}
        >
          PAUSE
        </Button>
        <Button
          variant="contained"
          onClick={handleClickClear}
          disabled={isRunning || totalSeconds === 0}
        >
          CLEAR
        </Button>
      </div>
    </>
  );
};

export default StopWatch;
