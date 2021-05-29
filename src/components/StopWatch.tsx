import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';

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

const StopWatch: FC<{}> = () => {
  const { seconds: totalSeconds, start, pause, init } = useStopWatch();

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  const handleClickStart = () => {
    start();
  };

  const handleClickPause = () => {
    pause();
  };

  const handleClickClear = () => {
    init();
  };

  const classes = useStyles();

  return (
    <>
      <Typography align="center" variant="h1">
        {displayMinutes}:{displaySeconds}
      </Typography>
      <div className={classes.buttons}>
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

export default StopWatch;
