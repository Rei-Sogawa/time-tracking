import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import InputTextField from '../basics/InputTextField';

export type TaskFormValues = {
  description: string;
};

const taskFormSchema = yup.object().shape({
  description: yup.string().required(),
});

const TaskFormPresenter = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
}) => {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: TaskFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <form onSubmit={hookFormHandleSubmit(handleSubmit)}>
      <InputTextField
        {...register('description')}
        placeholder="add new task"
        error={errors.description?.message}
        autoComplete="off"
      />
    </form>
  );
};

export default TaskFormPresenter;
