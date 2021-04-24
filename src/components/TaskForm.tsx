import { SubmitHandler, useForm } from "react-hook-form";

import { SWhiteButton } from "../basics/button";
import { InputText } from "../basics/input";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

type FormValues = {
  category: string;
  title: string;
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
      <div className="w-48">
        <InputText placeholder="category" {...register("category")} />
      </div>
      <div className="flex-1">
        <InputText placeholder="title" {...register("title")} />
      </div>
      <SWhiteButton className="col-span-2" type="submit">
        Submit
      </SWhiteButton>
    </form>
  );
}
