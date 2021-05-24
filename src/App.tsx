import { Box, Container, CssBaseline } from '@material-ui/core';
import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import StopWatch from './components/StopWatch';
import TaskForm, { FormValues } from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskNewForm from './components/TaskNewForm';
import { tasksRef } from './firebaseApp';
import { Task } from './models';

function App() {
  const [values] = useCollectionData<Task.Model>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
    snapshotListenOptions: {},
  });
  const tasks = useMemo(() => values || [], [values]);
  const categories = tasks
    .map((_) => _.category)
    .filter((_) => !!_) as string[];
  // const [focusedTask, setFocusedTask] = useState<Task.Model>();

  // const [totalSeconds, setTotalSeconds] = useState(0);
  // const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleSubmitNewTask = (values: FormValues) => {
    return tasksRef.add({ ...Task.getDefaultData(), ...values });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={3}>
          <StopWatch />
          <Box mt={2}>
            <TaskNewForm
              taskForm={
                <TaskForm
                  categories={categories}
                  onSubmit={handleSubmitNewTask}
                />
              }
            />
          </Box>
          <Box mt={2}>
            <TaskList
              tasks={tasks}
              taskForm={({ defaultValues, onSubmit }) => (
                <TaskForm
                  categories={categories}
                  defaultValues={defaultValues}
                  onSubmit={onSubmit}
                />
              )}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
