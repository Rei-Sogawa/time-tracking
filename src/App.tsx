import { Box, Container, CssBaseline } from '@material-ui/core';

import TaskForm from './components/TaskForm';

function App() {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={3}>
          <TaskForm onSubmit={(values) => console.log(values)}></TaskForm>
        </Box>
      </Container>
    </div>
  );
}

export default App;
