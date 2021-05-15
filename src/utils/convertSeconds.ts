export const convertSeconds = (seconds: number) => {
  const _hours = Math.floor(seconds / 60 / 60);
  const _minutes = Math.floor(seconds / 60) - _hours * 60;
  const _seconds = Math.floor(seconds % 60);
  return {
    seconds: _seconds,
    minutes: _minutes,
    hours: _hours,
  };
};
