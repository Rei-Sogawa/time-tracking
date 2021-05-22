import { FieldValue, serverTimestamp, Timestamp } from '../firebaseApp';

export type Data = {
  description: string;
  category: string | null;
  estimatedMinutes: number | null;
  requiredMinutes: number | null;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  completedAt: Timestamp | FieldValue | null;
};

export const getDefaultData = (): Data => ({
  description: '',
  category: null,
  estimatedMinutes: null,
  requiredMinutes: null,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  completedAt: null,
});
