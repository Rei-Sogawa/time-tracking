export type Data = {
  title: string;
  content: string;
  completed: boolean;
  requiredSeconds: number;
  estimatedSeconds: number;
  startTimes: Data[];
  stopTimes: Data[];
};
