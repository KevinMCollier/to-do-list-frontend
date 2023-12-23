import { Todo } from '../types/Todo';
import { format, isBefore, isAfter, isEqual, compareAsc, eachDayOfInterval, isWeekend } from 'date-fns';

const isWeekday = (date: Date) => !isWeekend(date);

const getDisplayDatesForTask = (task: Todo, startDate: Date, endDate: Date): Date[] => {
  console.log(`Processing task ID: ${task.id}, Title: ${task.title}, StartDate: ${startDate}, EndDate: ${endDate}, Repeat: ${task.repeat}`);
  const taskStartDate = new Date(task.date);
  console.log(`Task Start Date: ${taskStartDate}, StartDate: ${startDate}, EndDate: ${endDate}`);

  const dates: Date[] = [];
  if (task.repeat === 'Never') {
    if (isBefore(taskStartDate, endDate) && isAfter(taskStartDate, startDate) || isEqual(taskStartDate, startDate) || isEqual(taskStartDate, endDate)) {
      dates.push(taskStartDate);
      console.log(`Task ID: ${task.id} with title ${task.title} is added for date: ${taskStartDate}`);
    }
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

  console.log(`Task ID: ${task.id}, Generated Dates:`, dates);

  return dates;
};

const groupTasksByDisplayDates = (tasks: Todo[], startDate: Date, endDate: Date): Record<string, Todo[]> => {
  console.log("Starting to group tasks by display dates");
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

  console.log('Grouped Tasks by Dates:', sortedGrouped);
  return sortedGrouped;
};

export { groupTasksByDisplayDates };
