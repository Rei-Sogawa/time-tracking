import classNames from "classnames";
import React from "react";

export const InputText = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="text"
      className={classNames(
        {
          "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md": !props[
            "aria-invalid"
          ],
        },
        {
          "shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-red-300 rounded-md placeholder-red-300":
            props["aria-invalid"],
        },
        props.className
      )}
    />
  );
});

export const InputNumber = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="number"
      className={classNames(
        {
          "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md": !props[
            "aria-invalid"
          ],
        },
        {
          "shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-red-300 rounded-md placeholder-red-300":
            props["aria-invalid"],
        },
        props.className
      )}
    />
  );
});
