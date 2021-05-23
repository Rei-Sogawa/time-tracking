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
import { useRef } from 'react';
import { useClickAway, useToggle } from 'react-use';

import { serverTimestamp } from '../firebaseApp';
import { Task } from '../models';
import TaskEditForm from './TaskEditForm';

type Props = {
  task: Task.Model;
};

const TaskListItem = ({ task }: Props) => {
  const [showEditForm, toggleEditForm] = useToggle(false);

  const taskEditFormRef = useRef(null);

  useClickAway(taskEditFormRef, () => toggleEditForm(false));

  const handleToggleComplete = () =>
    task.ref.update({
      completedAt: task.completedAt ? null : serverTimestamp(),
    });

  const handleClickEdit = () => toggleEditForm(true);

  const handleClickRemove = () =>
    window.confirm('タスクを削除します。よろしいですか？') && task.ref.delete();

  return (
    <>
      {showEditForm ? (
        <ListItem ref={taskEditFormRef}>
          <Box width={1}>
            <Box mx={-2}>
              <TaskEditForm task={task} toggleEditForm={toggleEditForm} />
            </Box>
          </Box>
        </ListItem>
      ) : (
        <ListItem>
          <ListItemIcon>
            <ListItemIcon>
              <Checkbox
                checked={!!task.completedAt}
                onChange={handleToggleComplete}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary">{task.description}</Typography>
              }
              secondary={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {task.category && `${task.category} / `}
                  {task.estimatedMinutes && `${task.estimatedMinutes}min`}
                  <ArrowRightAlt />
                  {Math.floor(task.requiredSeconds * 1_000)}min
                </span>
              }
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
