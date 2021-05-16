export const convertSeconds = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor(totalSeconds / 60) - hours * 60;
  const seconds = Math.floor(totalSeconds % 60);

  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');

  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return {
    seconds,
    minutes,
    hours,
    formattedSeconds,
    formattedMinutes,
    formattedHours,
    formattedTime,
  };
};
