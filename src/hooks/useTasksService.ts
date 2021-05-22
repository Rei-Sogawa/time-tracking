import { useCallback } from 'react';

import { FormValues } from '../components/TaskForm';
import { IdAndRef, serverTimestamp, tasksRef } from '../firebaseApp';
import { Task } from '../models';

const useTaskService = () => {
  const addNewTask = useCallback((values: FormValues) => {
    const newTask: Task.Data = { ...Task.getDefaultData(), ...values };
    return tasksRef.add(newTask);
  }, []);

  const toggleCompleteTask = useCallback((task: Task.Data & IdAndRef) => {
    return task.ref.update({
      completedAt: task.completedAt ? null : serverTimestamp(),
    });
  }, []);

  const removeTask = useCallback((task: Task.Data & IdAndRef) => {
    return task.ref.delete();
  }, []);

  return {
    addNewTask,
    toggleCompleteTask,
    removeTask,
  };
};

export default useTaskService;
