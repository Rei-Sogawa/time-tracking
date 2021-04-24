import { SubmitHandler, useForm } from "react-hook-form";

import { SWhiteButton } from "../basics/button";
import { InputText } from "../basics/input";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

export type FormValues = {
  category: string;
  title: string;
  estimatedMinutes: string;
};

export default function TaskForm({ onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  return (
    <form
      className="flex space-x-3"
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
        <InputText placeholder="minutes" {...register("estimatedMinutes")} />
      </div>
      <SWhiteButton className="w-16 justify-center" type="submit">
        ADD
      </SWhiteButton>
    </form>
  );
}
