import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { tasksRef } from '../firebaseApp';
import { Task } from '../models';

const useTasksSubscription = () => {
  const [values] = useCollectionData<Task.Model>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
    snapshotListenOptions: {},
  });

  const tasks = useMemo(() => values || [], [values]);

  return { tasks };
};

export default useTasksSubscription;
