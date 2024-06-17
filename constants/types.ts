export type ReminderType = {
    id: number;
    title: string;
    notes?: string;
    startDate?: string; // ISO string format
    endDate?: string;   // ISO string format
  };
  