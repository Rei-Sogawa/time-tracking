import { Box, Container, CssBaseline } from '@material-ui/core';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={3}>
          <NewTaskForm />
          <Box mt={2}>
            <TaskList />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
