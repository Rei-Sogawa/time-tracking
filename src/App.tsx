import { Box, Container, CssBaseline } from '@material-ui/core';

import TaskList from './components/TaskList';
import TaskNewForm from './components/TaskNewForm';
import { TasksProvider } from './components/TasksContext';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={3}>
          <TasksProvider>
            <TaskNewForm />
            <Box mt={2}>
              <TaskList />
            </Box>
          </TasksProvider>
        </Box>
      </Container>
    </>
  );
}

export default App;
