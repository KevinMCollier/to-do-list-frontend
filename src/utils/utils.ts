import { Todo } from '../types/Todo';
import { startOfWeek, endOfWeek, eachDayOfInterval, isWeekend, format, compareAsc } from 'date-fns';

const isWeekday = (date: Date) => !isWeekend(date);

const getDisplayDatesForTask = (task: Todo, startDate: Date, endDate: Date): Date[] => {
  let dates: Date[] = [];

  if (task.repeat === 'Never') {
    dates.push(new Date(task.date));
  } else {
    const interval = eachDayOfInterval({ start: startDate, end: endDate });
    if (task.repeat === 'Daily') {
      dates = interval;
    } else if (task.repeat === 'Daily - Weekdays') {
      dates = interval.filter(isWeekday);
    } else if (task.repeat === 'Daily - Weekends') {
      dates = interval.filter(isWeekend);
    } else if (task.repeat === 'Weekly' && task.dayOfWeek) {
      dates = interval.filter(date => format(date, 'EEEE') === task.dayOfWeek);
    }
  }
  return dates;
};

const groupTasksByDisplayDates = (tasks: Todo[], startDate: Date, endDate: Date): Record<string, Todo[]> => {
  const groupedTasks: Record<string, Todo[]> = {};

  tasks.forEach(task => {
    getDisplayDatesForTask(task, startDate, endDate).forEach(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      groupedTasks[dateString] = groupedTasks[dateString] || [];
      groupedTasks[dateString].push(task);
    });
  });

  // Sort the grouped dates
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => compareAsc(new Date(a), new Date(b)));
  const sortedGrouped: Record<string, Todo[]> = {};
  sortedDates.forEach(date => {
    sortedGrouped[date] = groupedTasks[date];
  });

  return sortedGrouped;
};

export { groupTasksByDisplayDates, startOfWeek, endOfWeek };
