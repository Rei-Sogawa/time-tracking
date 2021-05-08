import { forwardRef, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';

type InputTextFieldProps = HTMLAttributes<HTMLInputElement> & {
  error?: string;
  disabled?: boolean;
};

const InputTextField = forwardRef(
  (props: InputTextFieldProps, ref: Ref<HTMLInputElement>) => {
    const { error, disabled, ...rest } = props;

    return (
      <>
        <input
          type="text"
          className={classNames(
            'block w-full rounded-md focus:outline-none',
            error
              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          disabled={disabled}
          ref={ref}
          {...rest}
        />

        {error && <p className="mt-1 ml-1 text-sm text-red-500">{error}</p>}
      </>
    );
  }
);

export default InputTextField;
