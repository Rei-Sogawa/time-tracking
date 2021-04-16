import React, { useEffect, useState } from 'react';

export default function App() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (on) {
      const timer = setInterval(() => setTotalSeconds((val) => val + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [on]);

  const minutes = () => Math.floor(totalSeconds / 60);
  const seconds = () => totalSeconds - minutes() * 60;

  const displayMinutes = () => minutes().toString().padStart(2, '0');
  const displaySeconds = () => seconds().toString().padStart(2, '0');

  return (
    <div className="h-screen bg-gray-100 flex items-center">
      <div className="flex-1 flex-col space-y-10 pb-24">
        <div className="text-center text-9xl font-mono">
          {displayMinutes()}:{displaySeconds()}
        </div>
        <div className="flex justify-center space-x-3 mx-auto">
          <XLargeWhiteButton text="START" onClick={() => setOn(true)} />
          <XLargeWhiteButton text="STOP" onClick={() => setOn(false)} />
          <XLargeWhiteButton
            text="CLEAR"
            onClick={() => {
              setOn(false);
              setTotalSeconds(0);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function XLargeWhiteButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
