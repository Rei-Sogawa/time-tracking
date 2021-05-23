import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
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
  const { toggleCompleteTask, removeTask } = useContext(TasksContext);
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
              primary={task.description}
              secondary={[
                task.category,
                task.estimatedMinutes && `${task.estimatedMinutes}min`,
              ].join(' ')}
            />
            <ListItemSecondaryAction>
              <IconButton>
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
