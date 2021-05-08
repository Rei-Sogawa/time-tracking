export type Data = {
  description: string;
  completed: boolean;
  requiredSeconds: number;
  estimatedSeconds: number;
  startTimes: Data[];
  stopTimes: Data[];
};
