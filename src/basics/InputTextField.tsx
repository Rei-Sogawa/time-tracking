import classNames from 'classnames';
import { ForwardedRef,forwardRef, InputHTMLAttributes } from 'react';

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const InputTextField = forwardRef(
  (props: InputTextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { error, ...rest } = props;
    return (
      <>
        <input
          type="text"
          className={classNames(
            'block w-full rounded-md focus:outline-none',
            error
              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
            rest.disabled && 'cursor-not-allowed opacity-50'
          )}
          ref={ref}
          {...rest}
        />
        {error && <p className="mt-1 ml-1 text-sm text-red-500">{error}</p>}
      </>
    );
  }
);

export default InputTextField;
