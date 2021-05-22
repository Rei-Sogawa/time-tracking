import { sortBy } from 'ramda';
import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { IdAndRef, tasksRef, Timestamp } from '../firebaseApp';
import { Task } from '../models';

const useTasksSubscription = () => {
  const [values] = useCollectionData<Task.Data & IdAndRef>(tasksRef, {
    idField: 'id',
    refField: 'ref',
    snapshotOptions: { serverTimestamps: 'estimate' },
    snapshotListenOptions: {},
  });

  const tasks = useMemo(() => values || [], [values]);

  const sortedTask = useMemo(
    () => sortBy((task) => -(task.createdAt as Timestamp).toDate(), tasks),
    [tasks]
  );

  return { tasks, sortedTask };
};

export default useTasksSubscription;
