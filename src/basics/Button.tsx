import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
  color?: 'white';
};

const Button = ({ size, color, ...rest }: Props) => (
  <button
    className={classNames(
      'inline-flex items-center shadow-sm font-medium rounded',
      size === 'xsm' && 'px-2.5 py-1.5 text-xs',
      color === 'white' &&
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      rest.disabled && 'cursor-not-allowed opacity-50',
    )}
    {...rest}
  >
    {rest.children}
  </button>
);

export default Button;
