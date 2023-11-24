import { Todo } from '../types/Todo';
import { format, parseISO, compareAsc } from 'date-fns';

export const groupTasksByDate = (tasks: Todo[]): Record<string, Todo[]> => {
  const grouped = tasks.reduce((group, task) => {
    const date = format(parseISO(task.date), 'yyyy-MM-dd');
    group[date] = group[date] ?? [];
    group[date].push(task);
    return group;
  }, {} as Record<string, Todo[]>);

  // Sort the grouped dates
  const sortedDates = Object.keys(grouped).sort((a, b) => compareAsc(parseISO(a), parseISO(b)));
  const sortedGrouped: Record<string, Todo[]> = {};
  sortedDates.forEach(date => {
    sortedGrouped[date] = grouped[date];
  });

  return sortedGrouped;
};
