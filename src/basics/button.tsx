import classNames from "classnames";
import React from "react";

function Button({
  _className,
  props,
}: {
  _className: string;
  props: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      {...props}
      className={classNames(
        _className,
        { "opacity-50 cursor-not-allowed": props.disabled },
        props.className
      )}
    ></button>
  );
}

export function XSWhiteButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const _className =
    "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return <Button _className={_className} props={props}></Button>;
}

export function SWhiteButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const _className =
    "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return <Button _className={_className} props={props}></Button>;
}

export function WhiteButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const _className =
    "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return <Button _className={_className} props={props}></Button>;
}
