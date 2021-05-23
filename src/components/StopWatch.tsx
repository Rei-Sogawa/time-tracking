import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC, useContext, useEffect } from 'react';

import useStopWatch from '../hooks/useStopWatch';
import { Task } from '../models';
import { TasksContext } from './TasksContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Wrapper: FC<{}> = () => {
  const { taskBeingFocused } = useContext(TasksContext);
  return (
    <>
      {taskBeingFocused ? (
        <StopWatchWithTask taskBeingFocused={taskBeingFocused} />
      ) : (
        <StopWatch />
      )}
    </>
  );
};

const StopWatchWithTask: FC<{ taskBeingFocused: Task.Model }> = ({
  taskBeingFocused,
}) => {
  const classes = useStyles();

  const {
    seconds: totalSeconds,
    start,
    pause,
    reset,
  } = useStopWatch({
    offsetMilliseconds: taskBeingFocused.requiredSeconds * 1_000,
  });

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  const { startTimer, countTimer, pauseTimer, clearTimer } =
    useContext(TasksContext);

  useEffect(() => {
    countTimer(totalSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds]);

  const handleClickStart = () => {
    startTimer();
    start();
  };

  const handleClickPause = () => {
    pauseTimer();
    pause();
  };

  const handleClickClear = () => {
    clearTimer();
    reset();
  };

  return (
    <>
      <Typography align="center" variant="h1">
        {displayMinutes}:{displaySeconds}
      </Typography>

      <Typography align="center">{taskBeingFocused.description}</Typography>

      <div className={classes.root}>
        <Button variant="contained" onClick={handleClickStart}>
          START
        </Button>
        <Button variant="contained" onClick={handleClickPause}>
          PAUSE
        </Button>
        <Button variant="contained" onClick={handleClickClear}>
          CLEAR
        </Button>
      </div>
    </>
  );
};

const StopWatch: FC<{}> = () => {
  const classes = useStyles();

  const { seconds: totalSeconds, start, pause, reset } = useStopWatch();

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  const { startTimer, countTimer, pauseTimer, clearTimer } =
    useContext(TasksContext);

  useEffect(() => {
    countTimer(totalSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds]);

  const handleClickStart = () => {
    startTimer();
    start();
  };

  const handleClickPause = () => {
    pauseTimer();
    pause();
  };

  const handleClickClear = () => {
    clearTimer();
    reset();
  };

  return (
    <>
      <Typography align="center" variant="h1">
        {displayMinutes}:{displaySeconds}
      </Typography>
      <div className={classes.root}>
        <Button variant="contained" onClick={handleClickStart}>
          START
        </Button>
        <Button variant="contained" onClick={handleClickPause}>
          PAUSE
        </Button>
        <Button variant="contained" onClick={handleClickClear}>
          CLEAR
        </Button>
      </div>
    </>
  );
};

export default Wrapper;
