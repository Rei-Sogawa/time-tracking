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
import { Delete, Edit, Timer } from '@material-ui/icons';
import { useContext, useRef } from 'react';
import { useClickAway, useToggle } from 'react-use';

import { Task } from '../models';
import TaskEditForm from './TaskEditForm';
import { TasksContext } from './TasksContext';

type Props = {
  task: Task.Model;
};

const TaskListItem = ({ task }: Props) => {
  const {
    toggleCompleteTask,
    removeTask,
    taskBeingFocused,
    focusTask,
    focusOutTask,
  } = useContext(TasksContext);

  const handleFocusTask = () => {
    if (taskBeingFocused?.id !== task.id) {
      focusTask(task.id);
      return;
    } else {
      focusOutTask();
    }
  };

  const [showEditForm, toggleEditForm] = useToggle(false);
  const taskEditFormRef = useRef(null);
  useClickAway(taskEditFormRef, () => toggleEditForm(false));

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
                onChange={() => toggleCompleteTask(task)}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary">{task.description}</Typography>
              }
              secondary={[
                task.category,
                task.estimatedMinutes && `${task.estimatedMinutes}min`,
                `-> ${Math.floor(task.requiredSeconds / 60)}min`,
              ]
                .filter((_) => !!_)
                .join(' / ')}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleFocusTask()}>
                <Timer />
              </IconButton>
              <IconButton onClick={() => toggleEditForm(true)}>
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (window.confirm('タスクを削除します。よろしいですか？')) {
                    removeTask(task);
                  }
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>{' '}
          </ListItemIcon>
        </ListItem>
      )}
    </>
  );
};

export default TaskListItem;
