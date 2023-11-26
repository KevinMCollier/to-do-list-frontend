// utils/utils.test.ts
import { groupTasksByDisplayDates } from './utils';
import { Todo } from '../types/Todo';
import { format, addDays } from 'date-fns';

describe('Utils', () => {
  describe('groupTasksByDisplayDates', () => {
    it('correctly groups tasks by their dates', () => {
      const startDate = new Date('2023-03-01');
      const endDate = addDays(startDate, 2); // Covering 3 days

      // Mock tasks spread across different dates
      const mockTasks: Todo[] = [
        { _id: '1', title: 'Task 1', date: '2023-03-01', repeat: 'Never', user: 'user1' },
        { _id: '2', title: 'Task 2', date: '2023-03-01', repeat: 'Daily', user: 'user1' },
        { _id: '3', title: 'Task 3', date: '2023-03-02', repeat: 'Never', user: 'user1' },
        { _id: '4', title: 'Task 4', date: '2023-03-03', repeat: 'Never', user: 'user1' },
        // Add more tasks if needed to test different scenarios
      ];

      const groupedTasks = groupTasksByDisplayDates(mockTasks, startDate, endDate);

      // Check that each date key exists and has the correct tasks
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedSecondDay = format(addDays(startDate, 1), 'yyyy-MM-dd');
      const formattedThirdDay = format(addDays(startDate, 2), 'yyyy-MM-dd');

      expect(groupedTasks).toHaveProperty(formattedStartDate);
      expect(groupedTasks[formattedStartDate]).toEqual(expect.arrayContaining([mockTasks[0], mockTasks[1]]));

      expect(groupedTasks).toHaveProperty(formattedSecondDay);
      expect(groupedTasks[formattedSecondDay]).toEqual(expect.arrayContaining([mockTasks[2]]));

      expect(groupedTasks).toHaveProperty(formattedThirdDay);
      expect(groupedTasks[formattedThirdDay]).toEqual(expect.arrayContaining([mockTasks[3]]));
    });
  });
});
