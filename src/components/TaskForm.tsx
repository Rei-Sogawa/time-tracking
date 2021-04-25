import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { SWhiteButton } from "../basics/button";
import { InputNumber, InputText } from "../basics/input";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

export type FormValues = {
  category: string;
  title: string;
  estimatedMinutes: string;
};

const schema = yup.object().shape({
  estimatedMinutes: yup
    .number()
    .integer()
    .min(0)
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
});

export default function TaskForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema), mode: "onChange" });

  return (
    <form
      className="px-3 flex space-x-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
        reset();
      }}
    >
      <div className="w-32">
        <InputText placeholder="category" {...register("category")} />
      </div>
      <div className="flex-1">
        <InputText placeholder="title" {...register("title")} />
      </div>
      <div className="w-32">
        <InputNumber
          placeholder="minutes"
          {...register("estimatedMinutes")}
          aria-invalid={!!errors.estimatedMinutes}
        />
      </div>
      <SWhiteButton className="w-20 justify-center" type="submit">
        POST
      </SWhiteButton>
    </form>
  );
}
