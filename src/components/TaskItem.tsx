import { useState } from 'react';

import { SWhiteButton, XSWhiteButton } from '../basics/button';
import { DocumentReference, serverTimestamp, Timestamp } from '../firebaseApp';
import { useTimer } from '../hooks/useTimer';
import * as Task from '../models/task';

type Props = {
  task: Task.Data & { id: string; ref: DocumentReference };
};

export default function TaskItem({ task }: Props) {
  const [focused, setFocused] = useState(false);
  const { totalSeconds, running, start, stop, clear } = useTimer({});

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');

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
        {focused ? (
          <SWhiteButton
            className="w-16 justify-center"
            onClick={() => setFocused(false)}
          >
            BACK
          </SWhiteButton>
        ) : (
          <SWhiteButton
            className="w-16 justify-center"
            onClick={() => setFocused(true)}
          >
            FOCUS
          </SWhiteButton>
        )}
      </div>
      {focused && (
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
              onClick={() => {
                clear();
                const updatedData: Partial<Task.FirestoreData> = {
                  completedAt: serverTimestamp() as Timestamp,
                };
                task.ref.update(updatedData);
              }}
              disabled={running}
            >
              DONE
            </XSWhiteButton>
          </div>
        </div>
      )}
    </div>
  );
}
