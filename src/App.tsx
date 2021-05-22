import { Box, Container, CssBaseline } from '@material-ui/core';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import { TasksProvider } from './components/TasksContext';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={3}>
          <TasksProvider>
            <NewTaskForm />
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
