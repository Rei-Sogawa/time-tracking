export type Data = {
  description: string;
  completed: boolean;
  requiredSeconds: number;
  estimatedSeconds: number;
  startTimes: Data[];
  stopTimes: Data[];
};

export const getDefaultData: () => Data = () => ({
  description: '',
  completed: false,
  requiredSeconds: 0,
  estimatedSeconds: 0,
  startTimes: [],
  stopTimes: [],
});
