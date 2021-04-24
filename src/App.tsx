import { useCollectionData } from 'react-firebase-hooks/firestore';

import TaskForm, { FormValues } from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { db } from './firebaseApp';
import * as Task from './models/task';

export default function App() {
  const [tasks] = useCollectionData<Task.Data, 'id', 'ref'>(
    db.collection('tasks'),
    {
      transform: Task.fromFirestore,
      snapshotOptions: { serverTimestamps: 'estimate' },
      idField: 'id',
      refField: 'ref',
    }
  );

  const onSubmit = (values: FormValues) => {
    const { title, category, estimatedMinutes } = values;
    const newTask: Task.FirestoreData = {
      ...Task.getDefaultFirestoreData(),
      title,
      category,
      estimatedSeconds: Number(estimatedMinutes),
    };
    debugger;
    db.collection('tasks').add(newTask);
  };

  return (
    <div className="h-screen bg-white">
      <div className="max-w-screen-lg mx-auto py-5">
        <div className="space-y-3">
          <TaskForm onSubmit={onSubmit} />
          <div className="space-y-1.5">
            {tasks
              ?.filter((task) => !Task.isComplete(task))
              .map((task) => (
                <div key={task.id}>
                  <TaskItem task={task} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
