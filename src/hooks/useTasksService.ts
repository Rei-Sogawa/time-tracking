import { useCallback } from 'react';

import { FormValues } from '../components/TaskForm';
import { serverTimestamp, tasksRef } from '../firebaseApp';
import { Task } from '../models';

const useTaskService = () => {
  const addNewTask = useCallback((values: FormValues) => {
    const newTask: Task.Data = { ...Task.getDefaultData(), ...values };
    return tasksRef.add(newTask);
  }, []);

  const updateEditTask = useCallback(
    ({ task, values }: { task: Task.Model; values: FormValues }) => {
      return task.ref.update({ ...values });
    },
    []
  );

  const toggleCompleteTask = useCallback((task: Task.Model) => {
    return task.ref.update({
      completedAt: task.completedAt ? null : serverTimestamp(),
    });
  }, []);

  const removeTask = useCallback((task: Task.Model) => {
    return task.ref.delete();
  }, []);

  const pauseStopWatch = useCallback(
    ({
      task,
      requiredSeconds,
    }: {
      task: Task.Model;
      requiredSeconds: number;
    }) => {
      return task.ref.update({ requiredSeconds });
    },
    []
  );

  const clearStopWatch = useCallback((task: Task.Model) => {
    return task.ref.update({ requiredSeconds: 0 });
  }, []);

  return {
    addNewTask,
    updateEditTask,
    toggleCompleteTask,
    removeTask,
    pauseStopWatch,
    clearStopWatch,
  };
};

export default useTaskService;
