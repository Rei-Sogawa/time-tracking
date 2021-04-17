import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function App() {
  const { minutes, seconds, on, start, stop, clear } = useTimer();

  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full max-w-3xl mx-auto flex items-center">
        <div className="flex-1 flex-col space-y-10">
          <div className="text-center text-9xl font-mono">
            {displayMinutes}:{displaySeconds}
          </div>
          <div className="flex justify-center space-x-3">
            <XLargeWhiteButton onClick={() => start()} disabled={on}>
              START
            </XLargeWhiteButton>
            <XLargeWhiteButton onClick={() => stop()} disabled={!on}>
              STOP
            </XLargeWhiteButton>
            <XLargeWhiteButton
              onClick={() => clear()}
              disabled={on || !seconds}
            >
              DONE
            </XLargeWhiteButton>
          </div>
          <div>
            <TaskForm
              onSubmit={(values) => {
                console.log(values);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function XLargeWhiteButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        'inline-flex items-center border border-gray-300 rounded-md shadow-sm px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        { 'opacity-50': props.disabled, 'cursor-not-allowed': props.disabled },
        props.className
      )}
    ></button>
  );
}

function useTimer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  const [on, setOn] = useState(false);
  const start = () => setOn(true);
  const stop = () => setOn(false);
  const clear = () => setTotalSeconds(0);

  useEffect(() => {
    if (on) {
      const timer = setInterval(() => setTotalSeconds((val) => val + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [on]);

  return {
    minutes,
    seconds,
    on,
    start,
    stop,
    clear,
  };
}

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props: React.InputHTMLAttributes<HTMLInputElement>, ref) => (
  <input
    type="text"
    className={classNames(
      'block w-full border border-gray-300 rounded-md shadow-sm px-6 py-3 text-base font-medium text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
      props.className
    )}
    {...props}
    ref={ref}
  />
));

type TaskFormValues = { taskName: string };

function TaskForm({ onSubmit }: { onSubmit: SubmitHandler<TaskFormValues> }) {
  const { register, handleSubmit, reset } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data: TaskFormValues) => {
        onSubmit(data);
        reset();
      })}
    >
      <TextInput {...register('taskName')} placeholder="新しいタスク" />
    </form>
  );
}
