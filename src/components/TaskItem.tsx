import { useState } from "react";

import { SWhiteButton, XSWhiteButton } from "../basics/button";
import { useTimer } from "../hooks/useTimer";
import * as Task from "../models/task";

type Props = {
  task: Task.Data;
};

export default function TaskItem({ task }: Props) {
  const [focusing, setFocusing] = useState(false);
  const { totalSeconds, running, start, stop, clear } = useTimer({});

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const displayMinutes = minutes.toString().padStart(2, "0");
  const displaySeconds = seconds.toString().padStart(2, "0");

  return (
    <div>
      <div className="flex space-x-3 items-center">
        <div className="w-32">
          <div className="px-2">{task.category}</div>
        </div>
        <div className="flex-1">
          <div className="px-2">{task.title}</div>
        </div>
        <div className="w-32 flex justify-end">
          <div className="px-2">{task.estimatedSeconds}</div>
        </div>
        {focusing ? (
          <SWhiteButton
            className="w-16 justify-center"
            onClick={() => setFocusing(false)}
          >
            BACK
          </SWhiteButton>
        ) : (
          <SWhiteButton
            className="w-16 justify-center"
            onClick={() => setFocusing(true)}
          >
            FOCUS
          </SWhiteButton>
        )}
      </div>
      {focusing && (
        <div className="py-3 space-y-2">
          <div className="text-center text-5xl font-mono">
            {displayMinutes}:{displaySeconds}
          </div>
          <div className="flex space-x-1 justify-center">
            <XSWhiteButton onClick={() => start()} disabled={running}>
              START
            </XSWhiteButton>
            <XSWhiteButton onClick={() => stop()} disabled={!running}>
              STOP
            </XSWhiteButton>
            <XSWhiteButton
              onClick={() => clear()}
              disabled={running || !seconds}
            >
              DONE
            </XSWhiteButton>
          </div>
        </div>
      )}
    </div>
  );
}
