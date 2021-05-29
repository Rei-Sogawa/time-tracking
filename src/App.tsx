import { Box, Container, CssBaseline } from '@material-ui/core';
import { FC } from 'react';

import StopWatch from './components/StopWatch';
import TaskList from './components/TaskList';
import TaskNewForm from './components/TaskNewForm';
import { TasksProvider } from './contexts/tasks';

const Wrapper: FC = () => {
  return (
    <>
      <CssBaseline />
      <TasksProvider>
        <App />
      </TasksProvider>
    </>
  );
};

const App: FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <StopWatch />
        <Box mt={2}>
          <TaskNewForm />
        </Box>
        <Box mt={2}>
          <TaskList />
        </Box>
      </Box>
    </Container>
  );
};

export default Wrapper;
