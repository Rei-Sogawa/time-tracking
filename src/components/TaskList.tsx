import {
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Delete, Edit, Timer } from '@material-ui/icons';
import { FC, useContext } from 'react';

import { TasksContext } from './TasksContext';

const TaskList: FC<{}> = () => {
  const { tasks, toggleCompleteTask, removeTask } = useContext(TasksContext);

  return (
    <List>
      {tasks.map((task, index) => (
        <div key={task.id}>
          <ListItem>
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
              <IconButton>
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
            </ListItemSecondaryAction>
          </ListItem>
          {index !== tasks.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
};

export default TaskList;
