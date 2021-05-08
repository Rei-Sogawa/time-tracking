import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputTextField from '../basics/field/InputTextField';

type Props = {
  defaultValues?: TaskFormValues;
  handleSubmit: (values: TaskFormValues) => void;
};

type TaskFormValues = {
  description: string;
};

const taskFormSchema = yup.object().shape({
  description: yup.string().required(),
});

const TaskForm = ({ defaultValues, handleSubmit }: Props) => {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskFormSchema),
    defaultValues,
  });

  const onSubmit = (values: TaskFormValues) => {
    handleSubmit(values);
    reset();
  };

  return (
    <form onSubmit={hookFormHandleSubmit(onSubmit)}>
      <InputTextField
        {...register('description')}
        placeholder="add new task"
        error={errors.description?.message}
      />
    </form>
  );
};

export default TaskForm;
