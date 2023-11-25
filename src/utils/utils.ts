import { Todo } from '../types/Todo';
import { format, isBefore, isAfter, compareAsc, eachDayOfInterval, isWeekend } from 'date-fns';

const isWeekday = (date: Date) => !isWeekend(date);

const getDisplayDatesForTask = (task: Todo, startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const taskStartDate = new Date(task.date);

  // Check if the task's own date falls within the interval, including it even for 'Never' repeat status
  if (task.repeat === 'Never' && isBefore(taskStartDate, endDate) && !isBefore(taskStartDate, startDate)) {
    dates.push(taskStartDate);
  }

  if (task.repeat !== 'Never') {
    const effectiveStartDate = isBefore(taskStartDate, startDate) ? startDate : taskStartDate;
    if (!isAfter(effectiveStartDate, endDate)) {
      const interval = eachDayOfInterval({ start: effectiveStartDate, end: endDate });
      if (task.repeat === 'Daily') {
        dates.push(...interval);
      } else if (task.repeat === 'Daily - Weekdays') {
        dates.push(...interval.filter(isWeekday));
      } else if (task.repeat === 'Daily - Weekends') {
        dates.push(...interval.filter(isWeekend));
      } else if (task.repeat === 'Weekly' && task.dayOfWeek) {
        dates.push(...interval.filter(date => format(date, 'EEEE') === task.dayOfWeek));
      }
    }
  }

  return [...new Set(dates.map(date => date.toISOString()))].map(dateStr => new Date(dateStr));
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

  const sortedDates = Object.keys(groupedTasks).sort((a, b) => compareAsc(new Date(a), new Date(b)));
  const sortedGrouped: Record<string, Todo[]> = {};
  sortedDates.forEach(date => {
    sortedGrouped[date] = groupedTasks[date];
  });

  return sortedGrouped;
};

export { groupTasksByDisplayDates };
