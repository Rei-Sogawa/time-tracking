import { Box, Container, CssBaseline } from '@material-ui/core';

import StopWatch from './components/StopWatch';
import TaskList from './components/TaskList';
import TaskNewForm from './components/TaskNewForm';
import { TasksProvider } from './contexts/tasks';

function App() {
  return (
    <>
      <CssBaseline />
      <TasksProvider>
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
      </TasksProvider>
    </>
  );
}

export default App;
