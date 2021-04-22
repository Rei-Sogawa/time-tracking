import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function App() {
  const { seconds: totalSecond, on, start, stop, clear } = useTimer();
  const minutes = Math.floor(totalSecond / 60);
  const seconds = totalSecond - minutes * 60;
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
  const [seconds, setSeconds] = useState(0);

  const [on, setOn] = useState(false);
  const start = () => setOn(true);
  const stop = () => setOn(false);
  const clear = () => setSeconds(0);

  useEffect(() => {
    if (on) {
      const timer = setInterval(() => setSeconds((val) => val + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [on]);

  return {
    seconds,
    on,
    start,
    stop,
    clear,
  };
}
