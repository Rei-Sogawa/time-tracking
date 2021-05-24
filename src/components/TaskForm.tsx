import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FC, FormEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type Props = {
  defaultValues?: FormValues;
  categories: string[];
  onSubmit: (values: FormValues) => void;
};

export type FormValues = {
  category: string | null;
  description: string;
  estimatedMinutes: number | null;
};

// react-hooks-form の controller に undefined を初期値として与えると react が怒るので
type DefaultFieldValues = {
  category: string;
  description: string;
  estimatedMinutes: number | string;
};

const formSchema = yup.object().shape({
  category: yup
    .string()
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
  description: yup.string().required(),
  estimatedMinutes: yup
    .number()
    .typeError('estimated minutes must be a number')
    .integer('estimated minutes must be a integer')
    .min(0, 'estimated minutes must be greater than or equal to 0')
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
});

const TaskForm: FC<Props> = ({
  defaultValues = {
    category: null,
    description: '',
    estimatedMinutes: null,
  },
  categories,
  onSubmit,
}) => {
  const {
    handleSubmit: hookFormHandleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DefaultFieldValues>({
    defaultValues: Object.entries(defaultValues).reduce((acc, [k, v]) => {
      return { ...acc, [k]: v || '' };
    }, {}),
    resolver: yupResolver(formSchema),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    hookFormHandleSubmit((values: FormValues) => {
      onSubmit(values);
      reset();
    })(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              onChange={(_, v) => {
                field.onChange(v);
              }}
              freeSolo
              disableClearable
              options={categories}
              style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="category"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          )}
        />
        <Box ml={2} flexGrow={1}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="description"
                autoComplete="off"
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />
        </Box>
        <Box ml={2}>
          <Controller
            name="estimatedMinutes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="estimated minutes"
                error={!!errors.estimatedMinutes}
                helperText={errors.estimatedMinutes?.message}
              />
            )}
          />
        </Box>
      </Box>
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
};

export default TaskForm;
