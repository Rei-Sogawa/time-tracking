import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ArrowRightAlt, Delete, Edit, Timer } from '@material-ui/icons';
import { FC, useRef } from 'react';
import { useClickAway, useToggle } from 'react-use';

import { useTasks } from '../contexts/tasks';
import { serverTimestamp } from '../firebaseApp';
import { Task } from '../models';
import TaskForm, { FormValues } from './TaskForm';

type Props = {
  task: Task.Model;
};

const TaskListItem: FC<Props> = ({ task }) => {
  const [showEditForm, toggleEditForm] = useToggle(false);

  const taskEditFormRef = useRef(null);

  useClickAway(taskEditFormRef, () => toggleEditForm(false));

  const handleClickEdit = () => toggleEditForm(true);

  const {
    state: { categories },
  } = useTasks();

  const handleSubmitEditTask = (values: FormValues) => {
    task.ref.update({ ...values });
    toggleEditForm(false);
  };

  const handleToggleComplete = () =>
    task.ref.update({
      completedAt: task.completedAt ? null : serverTimestamp(),
    });

  const handleClickRemove = () =>
    window.confirm('タスクを削除します。よろしいですか？') && task.ref.delete();

  return (
    <>
      {showEditForm ? (
        /* TaskEditForm */
        <ListItem ref={taskEditFormRef}>
          <Box width={1}>
            <Box mx={-2}>
              <TaskForm
                defaultValues={{
                  category: task.category,
                  description: task.description,
                  estimatedMinutes: task.estimatedMinutes,
                }}
                categories={categories}
                onSubmit={handleSubmitEditTask}
              />
            </Box>
          </Box>
        </ListItem>
      ) : (
        <ListItem>
          <ListItemIcon>
            <ListItemIcon>
              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={!!task.completedAt}
                  onChange={handleToggleComplete}
                />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary">{task.description}</Typography>
              }
              secondary={(() => {
                const { category, estimatedMinutes, requiredSeconds } = task;
                const requiredMinutes = Math.floor(requiredSeconds / 60);
                const leftContent = [
                  category,
                  typeof estimatedMinutes === 'number'
                    ? `${estimatedMinutes} min`
                    : null,
                ]
                  .filter((_): _ is NonNullable<typeof _> => !!_)
                  .join(' / ');

                return (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {leftContent.length ? (
                      <>
                        {leftContent} / <ArrowRightAlt />
                        {requiredMinutes} min
                      </>
                    ) : (
                      <>
                        <ArrowRightAlt />
                        {requiredMinutes} min
                      </>
                    )}
                  </span>
                );
              })()}
            />
            <ListItemSecondaryAction>
              <IconButton>
                <Timer />
              </IconButton>
              <IconButton onClick={handleClickEdit}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleClickRemove}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemIcon>
        </ListItem>
      )}
    </>
  );
};

export default TaskListItem;
