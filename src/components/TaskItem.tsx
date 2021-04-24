import { XSWhiteButton } from "../basics/button";
import { useTimer } from "../hooks/useTimer";

export default function TaskItem() {
  const {
    totalSeconds,
    running,
    start,
    stop,
    clear,
    startedTimeRecords,
    stoppedTimeRecords,
  } = useTimer({});

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const displayMinutes = minutes.toString().padStart(2, "0");
  const displaySeconds = seconds.toString().padStart(2, "0");

  return (
    <div className="flex items-end space-x-3">
      <div className="text-xl font-mono">
        {displayMinutes}:{displaySeconds}
      </div>
      <div className="flex space-x-1">
        <XSWhiteButton onClick={() => start()} disabled={running}>
          START
        </XSWhiteButton>
        <XSWhiteButton onClick={() => stop()} disabled={!running}>
          STOP
        </XSWhiteButton>
        <XSWhiteButton onClick={() => clear()} disabled={running || !seconds}>
          DONE
        </XSWhiteButton>
      </div>
    </div>
  );
}
