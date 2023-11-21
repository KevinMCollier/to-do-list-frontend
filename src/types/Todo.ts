export type Todo = {
  _id: string;
  title: string;
  date: string;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  user: string;
};
