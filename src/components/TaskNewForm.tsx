import { Typography } from '@material-ui/core';
import { FC, ReactNode } from 'react';

type Props = {
  taskForm: ReactNode;
};

const NewTaskForm: FC<Props> = ({ taskForm }) => {
  return (
    <>
      <Typography variant="h6">Add New Task</Typography>
      {taskForm}
    </>
  );
};

export default NewTaskForm;
